// Type: TechTalk.SpecFlow.TableRows
// Assembly: TechTalk.SpecFlow, Version=1.6.1.0, Culture=neutral, PublicKeyToken=0778194805d6db41
// Assembly location: I:\Project\ExploreMVC3\Lib\TechTalk.SpecFlow.dll

using System.Collections;
using System.Collections.Generic;

namespace TechTalk.SpecFlow
{
    public class TableRows : IEnumerable<TableRow>, IEnumerable
    {
        public int Count { get; }
        public TableRow this[int index] { get; }

        #region IEnumerable<TableRow> Members

        public IEnumerator<TableRow> GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator();

        #endregion
    }
}
