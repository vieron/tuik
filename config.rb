###
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Haml
###

# CodeRay syntax highlighting in Haml
# First: gem install haml-coderay
# require 'haml-coderay'

# CoffeeScript filters in Haml
# First: gem install coffee-filter
# require 'coffee-filter'

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

helpers do
  # Generates a styleguide block.
  def styleguide_block(section, &block)
    @section = @styleguide.section(section)
    @example_html = kss_capture{ block.call }
    @_out_buf << partial('styleguide/block')
  end

  # Captures the result of a block within an erb template without spitting it
  # to the output buffer.
  def kss_capture(&block)
    out, @_out_buf = @_out_buf, ""
    yield
    @_out_buf
  ensure
    @_out_buf = out
  end
end


###
# Page command
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#


page "/tests/*", :layout => "layouts/qunit"

require "kss"
page "/styleguide/*", :layout => "layouts/styleguide" do
  @styleguide = Kss::Parser.new('source/tuik/stylesheets')
end

page "*", :layout => "layouts/layout"


# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :basepath, "/"

# Change the CSS directory
set :css_dir, "tuik/stylesheets"

# Change the JS directory
set :js_dir, "tuik/javascripts"

# Change the images directory
set :images_dir, "tuik/images"

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :cache_buster

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
   set :basepath, "/tuik/"
end




