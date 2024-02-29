const {I} = inject();

Given("I am on login page", () => {
    I.amOnPage("/login");
    I.wait(1);
});

When("I enter form fields:", (tableData) => {
    tableData.rows.forEach((row) => {
        const [fieldName, fieldValue] = row.cells;
        I.fillField(fieldName.value, fieldValue.value);
    });
    I.wait(1);
});

When("I click {string} button", (buttonName) => {
    I.click(`//button[contains(text(),"${buttonName}")]`);
});

Then("I see {string}  user menu.", (text) => {
    const uppercaseText = "Hello, " + text;
    I.see(uppercaseText.toUpperCase());
});

Then("I see {string} link on open user menu", (link) => {
    I.see(link);
});

Then("I click {string} link", (link) => {
    I.click(`.//a[contains(text(), "${link}")]`);
});

Then('I am on Profile page', () => {
    I.amOnPage('/profile');
    I.wait(1);
});

Then("I see {string} button", (buttonName) => {
    I.see(buttonName.toUpperCase());
});

Then('I click {string} button on profile page', (buttonName) => {
    I.click(`//button[contains(text(), "${buttonName}")]`);
});

Then('I am on create hotel page', () => {
    I.amOnPage("/addHotel");
});

Then('I click {string} button on Create form', (buttonName) => {
    I.click(`//button[contains(text(), "${buttonName}")]`);
});

Given('I am on register page', () => {
    I.amOnPage("/register");
    I.wait(1);
});

Then('I see {string} user menu.', (text) => {
    const uppercaseText = "Hello, " + text;
    I.see(uppercaseText.toUpperCase());
    I.wait(2);
});
