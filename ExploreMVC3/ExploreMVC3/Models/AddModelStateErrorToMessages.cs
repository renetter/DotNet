using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExploreMVC3.Models
{
    public static class AddModelStateErrorToMessages
    {
        public static void AddModelStateError(this IList<string> messages, ModelStateDictionary modelState)
        {
            foreach (var modelStateItem in modelState)
            {
                if (modelStateItem.Value.Errors.Any())
                {
                    foreach (var errorItem in modelStateItem.Value.Errors)
                    {
                        messages.Add(errorItem.ErrorMessage);
                    }
                }
            }
        }
    }
}