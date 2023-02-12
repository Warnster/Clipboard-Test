# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1 - AgentCustomID Database Update / Migration

A table column needs adding to the Agents table with a name of "AgentCustomID" and type "varchar(255)". This needs to be a unique column and nullable.

This is assuming there is a 1(facility) to Many(agents) relationship between the tables. 
From the context given it could be a Many to Many relationship can be possible. If this is the case, a joining table would need to be created (if it doesn't already) with the following added;

FacilityID, varchar(255), foriegn key constraint on Facilities Table
AgentId, varchar(255), foreign key constraint on Agent Table
AgentCustomId, varchar(255), unque column constraint, nullable.

Note: I've included tech details on the ticket, this is normally dependant on how the team likes to write tickets and whether they prefer tech details or not. Or, if it is aimed at a more junior member of the team to provide better guidence. I've assumed some sort of SQL database and outlined an approach with a 1 to many and many to many relationship

### AC criteia

Given I am a Facilities manager 
When i assign an Agent a customId
Then I should be able to see a row within the relevant column in the database.

Given I am a Facilities manager
When i assign an Agent a customId outside of the database validation constraint (max length, unique or others identified in the refinement sessions)
Then A row/AgentCustomID will not be Added

Note: I've kept the AC at a high business level, I would expect QA/testers to go off of these AC points and write testing plans/cases around them in more detail.

### Estimates/Time

1 day - 2 days
depending on experience on the project, i would expect this to take a single day or less for a migration or database update. This doesn't include deployment of the ticket, only development work. QA is also not included in this estimate as I do not know the setup and process involved in these stages. A newer memeber or less experienced team member might take 2 days for this ticket.

## Ticket 2 - Update getShiftsByFacility

update the getShiftsByFacility to return the AgentCustomID as well as the current AgentID being returned.

The ID can be found in ticket "AgentCustomID Database Update / Migration"(this would link to the ticket in JIRA or other task management tools)
Note: This should provide them with details on how it was implemented and also who worked on the task if they wanted a domain expert to ask questions to.

You will need to update the SQL query at (file location here) and select the AgentCustomID.

### AC

Given I am a Facilities User
When i request shifts at a Facility
Then i see the AgentCustomID if one has been assigned to the agent, else i see null

### Test

Make sure all unit / integration tests pass and coverage is kept up to the defined coverage level.

### Estimate

1 day

I've given this one day with unit and integration tests, the code change here is simple, however i am assuming an easy to edit the SQL query and that the unit / integration tests are well written and thus this change doesn't break 100's of them.


## Ticket 3 - Update generateReport

update the generateReport to out the AgentCustomID instead of the AgentID for each shift, if one exists.

If it does not exist, output the AgentID

Note: I don't expect to alter the PDF code here, only overwrite a variable value. something along the lines of 'const agentId = AgentCustomID ? AgentCustomID : AgentID'

### AC

Given I am a Facilities User
When i generate a report with a AgentCustomID included
Then see the AgentCustomID of an Agent

Given I am a Facilities User
When i generate a report without a AgentCustomID included
Then see the AgentID of an Agent

### Test

Make sure all unit / integration tests pass and coverage is kept up to the defined coverage level.

### Estimate

1 day

I've given this one day with unit and integration tests, the code change here is simple, however i am assuming the unit / integration tests are well written and thus this change doesn't break 100's of them.

## Ticket 4 - Update Insert Function 

This ticket is brief and a placeholder, after the database migration i am expecting their to be a need to update the insert code / function to add the AgentCustomID. If a ORM is being used then the orm schema would need to be updated.

Depends on / blocked by Ticket 1

## Ticket Order

I've written the tickets in way that tickets 1,2 and 3 be done all in parrallel with the correct mocking by each developer of Ticket 2 & 3. Ticket 4 would be blocked / depend on ticket 1, and they would all depend on each other before deployment.