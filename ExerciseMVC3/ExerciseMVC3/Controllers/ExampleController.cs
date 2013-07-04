using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExerciseMVC3.Controllers
{
    public class ExampleController : Controller
    {
        //
        // GET: /Example1/

        public string Example1()
        {
            return "Hello world";
        }

        public ViewResult Example2()
        {
            return View();
        }

        public JsonResult Example3()
        {
            return Json(new {Message = "Hello World"}, JsonRequestBehavior.AllowGet);
        } 

    }
}
