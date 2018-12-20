require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'Article.get_ycombinator_list method' do
    it "should return a list of 30 items if internet connection is ok" do
      url = "https://news.ycombinator.com/best?p=#{1}"
      expect(Article.get_ycombinator_list(url).length).to eq 30
    end

    it "should crawl ycombinator with pagination" do
      articles_page_1 = Article.get_ycombinator_list("https://news.ycombinator.com/best?p=#{1}")
      articles_page_2 = Article.get_ycombinator_list("https://news.ycombinator.com/best?p=#{2}")
      expect(articles_page_1[0].to_json).not_to eq(articles_page_2[0].to_json)
    end
  end

  describe 'Article.get_article method' do
    it "should return an article related to the given url" do
      url = "https://www.wsj.com/articles/elon-musks-spacex-is-raising-500-million-in-funding-11545142054"
      article = Article.get_article(url)
      expect(article.error).to be(nil)
      expect(article.cover_image_url).to be_present
      expect(article.title).to be_present
      expect(article.content).to be_present
    end
  end

end
