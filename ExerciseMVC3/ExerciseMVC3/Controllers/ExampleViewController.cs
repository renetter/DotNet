using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExerciseMVC3.Controllers
{
    public class ExampleViewController : Controller
    {
        //
        // GET: /ExampleView/

        public ActionResult SimpleView()
        {
            return View();
        }

        public ActionResult ViewWithAspx()
        {
            return View();
        }

        public ActionResult ViewWithRazor()
        {
            return View();
        }

    }
}
