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

  def get_original_content(url)
    document = MetaInspector.new(url)
    self.title = document.best_title
    self.url = url
    self.cover_image_url = document.images.best
    self.description = document.best_description
    self.content = Readability::Document.new(document.to_s).content

    self
  end

end
