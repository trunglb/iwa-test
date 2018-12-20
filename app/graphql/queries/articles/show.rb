class Queries::Articles::Show < GraphQL::Schema::Resolver
  type Types::ArticleType, null: false

  argument :url, String, "Article Url", required: true

  def resolve(url:)
    cache_key = "article_#{url}"
    article_cache = $redis.get(cache_key)
    if article_cache
      @article = Article.new(JSON.load(article_cache))
    else
      @article = Article.get_article(url)
      $redis.set(cache_key,  @article.to_json)
      $redis.expire(cache_key, 55.minutes.to_i)
    end
    @article
  end

end
