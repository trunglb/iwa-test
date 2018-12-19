class Article
  attr_accessor :title, :subtitle, :description, :url, :content, :cover_image_url


  def self.get_ycombinator_list(page = 1)
    document = Nokogiri::HTML(open("https://news.ycombinator.com/best?p=#{page}"))
    list = document.css('.athing').map do |html_item|
      article = Article.new
      article.parse_ycombinator_item(html_item)

      article
    end
    list
  end

  def parse_ycombinator_item(html_item)
    self.title = html_item.css('a.storylink')[0].text.strip rescue nil
    self.url = html_item.css('a.storylink')[0]["href"] rescue nil
    self.subtitle = html_item.css('.sitebit.comhead .sitestr').text.strip rescue nil
    self.description = html_item.next_element.text.strip rescue nil
  end

  def self.get_article(url)
    document = MetaInspector.new(url)
    article = Article.new

    article.title = document.best_title
    article.url = url
    article.cover_image_url = document.images.best
    article.description = document.best_description
    article.content = Readability::Document.new(document.to_s).content

    article
  end

end
