class Queries::Articles::Index < GraphQL::Schema::Resolver
  type [Types::ArticleType], null: false

  argument :pageNumber, Integer, "Page number", required: false

  def resolve(page_number: 1)
    page = [page_number, 1].max
    url = "https://news.ycombinator.com/best?p=#{page}"

    cache_key = "articles_#{url}"
    articles_cache = $redis.get(cache_key)
    if articles_cache
      @articles = JSON.load(articles_cache).map do |obj|
        Article.new(obj)
      end
    else
      @articles = Article.get_ycombinator_list(url)
      $redis.set(cache_key,  @articles.to_json)
      $redis.expire(cache_key, 5.minutes.to_i)
    end

    @articles
  end

end
