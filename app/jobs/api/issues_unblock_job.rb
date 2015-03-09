module Api
  class IssuesUnblockJob < IssuesStatusChangedJob
    action "issue_status_changed"
    timestamp Proc.new { Time.now.utc.iso8601}
    def status
      "unblocked"
    end
  end
end
