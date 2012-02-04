using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExploreMVC3.Models
{
    public class ModelBase
    {
        private IList<string> messages = new List<string>();

        public IList<string> Messages { get { return messages; } set { messages = value; } }
    }
}