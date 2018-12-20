class Article
  attr_accessor :title, :subtitle, :description, :url, :content, :cover_image_url

  def initialize(args = {})
    args.each do |k,v|
      instance_variable_set("@#{k}", v) unless v.nil?
    end
  end

  def self.get_ycombinator_list(url)
    document = Nokogiri::HTML(open(url))
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
    user_agent = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'

    document = MetaInspector.new(url, :headers => {'User-Agent' => user_agent})
    article = Article.new

    article.title = document.best_title
    article.url = url
    article.cover_image_url = document.images.best
    article.description = document.best_description
    article.content = Readability::Document.new(document.to_s).content

    article
  rescue Exception => e
    p url, '======='
    raise e
  end

end
