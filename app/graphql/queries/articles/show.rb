class Queries::Articles::Show < GraphQL::Schema::Resolver
  type Types::ArticleType, null: false

  argument :url, String, "Article Url", required: true

  def resolve(url:)
    @article = Article.new
    @article = @article.get_original_content(url)
  end

end
