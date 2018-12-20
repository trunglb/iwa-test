class Queries::Articles::Show < GraphQL::Schema::Resolver
  type Types::ArticleType, null: false

  argument :url, String, "Article Url", required: true

  def resolve(url:)
    cache_key = "article_#{url}"
    article_cache = $redis.get(cache_key)
    if article_cache
      @article = Article.new(JSON.load(article_cache))
    else
      begin
        @article = Article.get_article(url)
        $redis.set(cache_key,  @article.to_json)
        $redis.expire(cache_key, 1.day.to_i)
      rescue Exception => e
        $redis.set(cache_key, Article.new({error: e}).to_json)
        $redis.expire(cache_key, 10.minutes.to_i)
        raise e
      end

    end
    @article
  end

end
