// Type: TechTalk.SpecFlow.ScenarioContext
// Assembly: TechTalk.SpecFlow, Version=1.6.1.0, Culture=neutral, PublicKeyToken=0778194805d6db41
// Assembly location: I:\Project\ExploreMVC3\Lib\TechTalk.SpecFlow.dll

using System;

namespace TechTalk.SpecFlow
{
    public class ScenarioContext : SpecFlowContext
    {
        public ScenarioContext(ScenarioInfo scenarioInfo);
        public static ScenarioContext Current { get; }
        public ScenarioInfo ScenarioInfo { get; }
        public ScenarioBlock CurrentScenarioBlock { get; internal set; }
        public Exception TestError { get; internal set; }
        public void Pending();
        public object GetBindingInstance(Type bindingType);
    }
}
