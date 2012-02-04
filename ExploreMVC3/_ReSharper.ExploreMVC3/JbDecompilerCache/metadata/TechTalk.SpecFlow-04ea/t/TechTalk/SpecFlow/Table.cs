// Type: TechTalk.SpecFlow.Table
// Assembly: TechTalk.SpecFlow, Version=1.6.1.0, Culture=neutral, PublicKeyToken=0778194805d6db41
// Assembly location: I:\Project\ExploreMVC3\Lib\TechTalk.SpecFlow.dll

using System.Collections.Generic;

namespace TechTalk.SpecFlow
{
    public class Table
    {
        public Table(params string[] header);
        public IEnumerable<string> Header { get; }
        public TableRows Rows { get; }
        public int RowCount { get; }
        public void AddRow(params string[] cells);
        public override string ToString();
    }
}
