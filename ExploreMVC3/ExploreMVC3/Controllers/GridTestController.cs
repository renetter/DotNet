using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExploreMVC3.Controllers
{
    public class GridTestController : Controller
    {
        //
        // GET: /GridTest/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetContents()
        {
            // Months
            // Month constants
            string [] months = new string[12] {"January","Febuary","March", 
                                               "April","May","June",
                                               "July","August","September",
                                               "October","November","December"};

            List<object> dynamicContent = new List<object>();

            Random random = new Random();

            for (int i = 0; i < random.Next(15); i++)
            {
                dynamicContent.Add(new { Month = months[random.Next(11)], Income = random.Next(1000), Expenditure = random.Next(1000) });
            }

            return Json(dynamicContent);
        }

    }
}
