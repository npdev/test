# Test task "Ryd"
# Context
Issues are a typical problem at ryd. Our support team wants to become more
efficient in resolving issues. They decided to build a software that can automate their
processes — the software that you're going to develop.
# Product Requirements
- Ryd users can report an issue.
- New issues should be automatically assigned to a free support agent.
- Support agents can only handle one issue at a time.
- Support agents resolve issues: once done the issue is marked as resolved
and the support agent becomes available to take a new issue.
- The system should be able to assign unassigned issues automatically when a
support agent becomes available.
# Running the app
- Download
- Run "npm -install"
- Run script "build" by command "npm run build", then run script "start" by command "npm run start"
# Running the tests
- Run script "test" by "npm run test"
- Run script "coverage" by "npm run coverage" for coverage
# Test endpoints with Postman
- Use exported collection from Test.postman_collection.json
# Used technologies
- Node.js
- Express.js
- TypeScript
- Mongo + Mongoose
- Jest
- TSLint
# Database
- Create database "ryd" on localhost:27017
# Start to work with endpoints
- Create new user by /createUser with body { "name": ```userName``` }
- Create new issue by /createIssue with body { "name": ```issueName``` }
- Set issue as done by /doneIssue/```issueId```
