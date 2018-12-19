class Queries::Articles::Index < GraphQL::Schema::Resolver
  type [Types::ArticleType], null: false

  argument :pageNumber, Integer, "Page number", required: false

  def resolve(page_number: 1)
    page = [page_number, 1].max
    @articles = Article.get_ycombinator_list(page)
  end

end
