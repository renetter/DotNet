using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExerciseMVC3.Controllers
{
    public class Customer
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public int Deposit { get; set; }
    }

    public class ExampleModelController : Controller
    {
        public ActionResult PassModelToView()
        {
            var customer = new Customer
                               {
                                   Name = "Somebody",
                                   Address = "Someplace",
                                   Deposit = 10000000
                               };

            return View(customer);
        }

        [HttpPost]
        public ActionResult PassModelToController(Customer customer)
        {
            return View(customer);
        }

        public ActionResult ModelValidation()
        {
            var customer = new Customer
                               {
                                   Name = "Somebody",
                                   Address = "",
                                   Deposit = 10000000
                               };

            return View(customer);
        }

        [HttpPost]
        public ActionResult ModelValidation(Customer customer)
        {
            return View(customer);
        }

    }
}
