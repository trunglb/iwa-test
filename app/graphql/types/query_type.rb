class Types::QueryType < Types::BaseObject
  field :articles, resolver: Queries::Articles::Index, description: "Get articles from ycombinator"
  field :article, resolver: Queries::Articles::Show, description: "Get a single article from original url"
end
