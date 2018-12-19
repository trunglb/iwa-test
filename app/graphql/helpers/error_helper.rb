class Helpers::ErrorHelper

  def self.add_errors(context, *errors)
    errors.each do |error_msg|
      err = GraphQL::ExecutionError.new(error_msg)
      context.add_error(err)
    end
  end

end
