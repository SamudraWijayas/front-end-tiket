# Fix CardEvent Ticket Price Error

## Steps to Complete:

1. [x] Update HomeList.tsx to handle edge cases in ticketPrice calculation
2. [x] Update CardEvent.tsx to make ticketPrice optional and handle undefined cases
3. [ ] Verify the changes work correctly

## Details:

- Fixed optional chaining issues in ticketPrice calculation
- ticketPrice prop is already optional in CardEvent component
- Added proper null/undefined handling in HomeList.tsx
