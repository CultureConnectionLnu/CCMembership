# CCMS (Culture Connection Membership System)

====================

The Culture Connection membership management system.

New members can join and create accounts, payments are tracked and managed through the system (Need more descusion about it!).

## TODO Features

* Member signup form which collects full name, email (uniq id), Faculty, optional: discord, instagram, phone number
* Pay systems, Paypal, Revolute, Klarna (swish) **will do more research**
* The ability for the user to edit all their details allowing for self management.
* Various user statuses to cater for active members, how long for experation date members who have left or tracking honorary members connected with Excel sheet google api
* Handling of the induction/equipment training procedures and collection of payments to person who reponsible for memberships.
* Member card to showcase active member (Like in mecenat or STUKCO for showcasing student card)
* The ability for members to cancel their membership and leave

## Member Statuses

There are a variety of member statuses which are used for various scenarios.

* Setting Up - just signed up, no membership setup, no access to space.
* Active membership
* Leaving - The user has said they are leaving
* Left - Leaving users move here once their last payment expires.

## Setting It Up

run: npm install
run: npm run dev

## Tasks

* Database design and set up
* Member Login page, password authentication
* Member sign up page
* Payment page -> revolute intergration pending
* Member hompage -> should show logo based on paid or unpaid
