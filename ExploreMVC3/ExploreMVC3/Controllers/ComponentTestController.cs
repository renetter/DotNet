using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExploreMVC3.Models;

namespace ExploreMVC3.Controllers
{    
    public class ComponentTestController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult TestData1()
        {
            var selectList = new List<DropDownListAjaxItemModel>
                                 {
                                    new DropDownListAjaxItemModel
                                        {
                                            Text = "List 1",
                                            Value = "List1",
                                            ExtendedValue = new KeyValuePair<string,string>("ExtTest11","ExtTest12")
                                        },

                                    new DropDownListAjaxItemModel
                                    {
                                        Text = "List 2",
                                        Value = "List2",
                                        ExtendedValue = new KeyValuePair<string,string>("ExtTest21","ExtTest22")
                                    }
                                 };

            return Json(selectList);
        }

    }
}
