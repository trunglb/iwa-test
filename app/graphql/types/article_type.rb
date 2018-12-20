class Types::ArticleType < Types::BaseObject
  graphql_name "ArticleType"
  description "ArticleType"

  field :url, String, "Article's url", null: true

  field :cover_image_url, String, "Article's image", null: true

  field :title, String, "Article's title", null: true

  field :subtitle, String, "Article's subtitle", null: true

  field :description, String, "Article's description", null: true

  field :content, String, "Article's content", null: true


  def cover_image_url
    if object.cover_image_url.present?
      return object.cover_image_url
    else
      cache_key = "article_#{object.url}"
      article_cache = $redis.get(cache_key)
      if article_cache
        article = Article.new(JSON.load(article_cache))
        return article.try(:cover_image_url) || ''
      end
    end

  end
end
