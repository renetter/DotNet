using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ExploreMVC3.Tests.Helper;
using TechTalk.SpecFlow;
using WatiN.Core;
using Table = TechTalk.SpecFlow.Table;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ExploreMVC3.Tests.Step_Definition
{
    [Binding]
    public class LoginFeatureStepDefinition
    {
        private const string HttpLocalhost = "http://localhost:10000/";
        private const string LogOnLink = "Log On";

        [Given(@"I am on the index page")]
        public void GivenIAmOnTheIndexPage()
        {
            WebBrowser.Current.GoTo(HttpLocalhost); 
        }

        [When(@"I click the Log On link")]
        public void WhenIClickTheLogOnLink()
        {
            WebBrowser.Current.Link(Find.ByText(LogOnLink)).Click();
        }

        [Then(@"The login popup screen opened")]
        public void ThenTheLoginPopupScreenOpened()
        {
            Assert.AreEqual("block",
                            WebBrowser.Current.Div(
                                Find.ByClass(
                                    cls => cls.Contains("ui-dialog")))
                                .Style.Display);            
        }

        [When(@"I have filled the form in login popup as follow:")]
        public void WhenIHaveFilledTheFormInLoginPopupAsFollow(Table table)
        {
            // User Name
            WebBrowser.Current.TextField(Find.ById("UserName")).AppendText(table.Rows.Where(row => row["Label"] == "UserName").Select(row => row["Value"]).FirstOrDefault());

            // Password
            WebBrowser.Current.TextField(Find.ById("Password")).AppendText(table.Rows.Where(row => row["Label"] == "Password").Select(row => row["Value"]).FirstOrDefault());
        }

        [When(@"I click the button labeled ""(.*)""")]
        public void WhenIClickTheButtonLabeledLogOn(string label)
        {
            WebBrowser.Current.Button(Find.ByValue(label)).Click();
        }

        [Then(@"I should see error message ""(.*)""")]
        public void ThenIShouldSeeErrorMessage(string errorMessage)
        {
            Assert.AreEqual(errorMessage, WebBrowser.Current.ListItem(li => li.Text.Contains(errorMessage)).Text);
        }

        [Then(@"I should see the login popup closed")]
        public void ThenIShouldSeeTheLoginPopupClosed()
        {
            Assert.AreEqual("none",
                            WebBrowser.Current.Div(
                                Find.ByClass(
                                    cls => cls.Contains("ui-dialog")))
                                .Style.Display);
        }

        [Then(@"I should see the the label ""(.*)""")]
        public void ThenIShouldSeeTheTheLabelWelcomeAdministrator(string label)
        {
            Assert.AreEqual(label, WebBrowser.Current.Label(lbl => lbl.Text.Contains(label)).Text);
        }

        [Then(@"I should see the login link changed into logout")]
        public void ThenIShouldSeeTheLoginLinkChangedIntoLogout()
        {
            Assert.AreEqual("Log Out", WebBrowser.Current.Link(lnk => lnk.Text == "Log Out").Text);
        }


    }
}