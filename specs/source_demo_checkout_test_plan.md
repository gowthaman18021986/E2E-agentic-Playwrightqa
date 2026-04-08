# SauceDemo Checkout Test Plan

## Scenario 1: Login Success
**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter 'standard_user' in [data-test="username"]
3. Enter 'secret_sauce' in [data-test="password"]
4. Click [data-test="login-button"]

**Expected Results:** Redirected to /inventory.html

**Locators Found:**
- Username: [data-test="username"]
- Password: [data-test="password"]
- Login Button: [data-test="login-button"]

## Scenario 2: Field Validation (Password Empty)
**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter 'standard_user' in username
3. Leave password empty
4. Click login

**Expected Results:** Error message "Epic sadface: Password is required"

**Locators Found:** Same as above, plus error: [data-test="error"]

## Scenario 3: Account Security (Locked User)
**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter 'locked_out_user' in username
3. Enter 'secret_sauce' in password
4. Click login

**Expected Results:** Error "user is locked out"

**Locators Found:** Same

## Scenario 4: Session Termination
**Steps:**
1. Login as standard_user
2. Click menu button
3. Click logout
4. Try to use back button

**Expected Results:** Redirected to login, back button doesn't work

**Locators Found:**
- Menu: #react-burger-menu-btn
- Logout: [data-test="logout-sidebar-link"]
- Back button: browser back

## Scenario 5: Default Sorting
**Steps:**
1. Login
2. Check sort dropdown

**Expected Results:** Default "Name (A to Z)"

**Locators Found:** [data-test="product-sort-container"]

## Scenario 6: Price Sort Low to High
**Steps:**
1. Login
2. Select "Price (low to high)"
3. Check first and last items

**Expected Results:** First $7.99 Sauce Labs Onesie, last $49.99 Sauce Labs Fleece Jacket

**Locators Found:** Same, plus items: [data-test="inventory-item"]

## Scenario 7: Add to Cart State Change
**Steps:**
1. Login
2. Click Add to Cart on an item
3. Check button text and badge

**Expected Results:** Button "Remove", badge incremented

**Locators Found:** [data-test="add-to-cart-sauce-labs-backpack"], [data-test="shopping-cart-badge"]

## Scenario 8: Cart Persistence
**Steps:**
1. Login
2. Add 2 items
3. Refresh page
4. Check badge

**Expected Results:** Badge still 2

**Locators Found:** Same

## Scenario 9: Cart Inventory Sync
**Steps:**
1. Login
2. Add items
3. Go to cart
4. Check items

**Expected Results:** Items match with names/prices

**Locators Found:** Cart link: [data-test="shopping-cart-link"], cart items: [data-test="inventory-item-name"]

## Scenario 10: Cart Item Removal
**Steps:**
1. Add item to cart
2. Go to cart
3. Click Remove
4. Check badge

**Expected Results:** Item removed, badge decremented

**Locators Found:** Remove: [data-test="remove-sauce-labs-backpack"]

## Scenario 11: Continue Shopping
**Steps:**
1. Go to cart
2. Click Continue Shopping

**Expected Results:** Back to inventory, items remain

**Locators Found:** [data-test="continue-shopping"]

## Scenario 12: Cart Zero State
**Steps:**
1. Remove all items
2. Check badge

**Expected Results:** Badge hidden

**Locators Found:** Badge should not be visible

## Scenario 13: Checkout Required Fields
**Steps:**
1. Go to cart
2. Click Checkout
3. Try to continue without filling

**Expected Results:** Requires First Name, Last Name, Zip

**Locators Found:** Checkout: [data-test="checkout"], First Name: [data-test="firstName"], etc.

## Scenario 14: Checkout Validation
**Steps:**
1. Fill First and Zip, leave Last empty
2. Click Continue

**Expected Results:** Error "Last Name is required"

**Locators Found:** Continue: [data-test="continue"], Error: [data-test="error"]

## Scenario 15: Checkout Data Flow
**Steps:**
1. Fill all fields
2. Click Continue

**Expected Results:** Go to Overview

**Locators Found:** Same

## Scenario 16: Checkout Cancel
**Steps:**
1. On info page, click Cancel

**Expected Results:** Back to cart

**Locators Found:** [data-test="cancel"]

## Scenario 17: Order Calculation
**Steps:**
1. On overview, check Item total

**Expected Results:** Sum of prices

**Locators Found:** [data-test="subtotal-label"]

## Scenario 18: Tax Validation
**Steps:**
1. Check Tax and Total

**Expected Results:** Tax ~8%, Total = Item + Tax

**Locators Found:** [data-test="tax-label"], [data-test="total-label"]

## Scenario 19: Order Submission
**Steps:**
1. Click Finish

**Expected Results:** Thank you page

**Locators Found:** [data-test="finish"], Header: .complete-header

## Scenario 20: Final Cleanup
**Steps:**
1. On complete page

**Expected Results:** Cart badge 0

**Locators Found:** Badge not visible