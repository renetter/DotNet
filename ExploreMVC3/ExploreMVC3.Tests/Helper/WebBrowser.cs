using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WatiN.Core;
using TechTalk.SpecFlow;

namespace ExploreMVC3.Tests.Helper
{
    public static class WebBrowser
    {
        public static IE Current
        {
            get
            {
                if(!ScenarioContext.Current.ContainsKey("browser"))
                {
                    ScenarioContext.Current["browser"] = new IE();
                }
 
                return ScenarioContext.Current["browser"] as IE;
            }
        }
    }
}
