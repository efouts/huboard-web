module Api
  class HealthController < ApplicationController
    def board
      exam = HealthChecking::BoardExam.new({
        board: huboard.board(params[:user], params[:repo]),
        authorization: authorization_level,
        logged_in: logged_in? })
      payload = HealthChecking::Doctor.new(exam).check
      render json: {data: payload}
    end
  end
end