using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Dynamic;

namespace ExploreDynamics
{
    class Person
    {
        public string Name { get; set; }

        public string Age { get; set; }

        public string Address { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            dynamic person = new ExpandoObject();

            person.Name = "Test";
            person.Age = 30;
            person.Address = "TestAddress";

            // print the members
            PrintMembers(person);

            // remove a member            
            (person as IDictionary<string, object>).Remove("Address");

            Console.WriteLine();

            PrintMembers(person);

            // cast expando object to person wil throw exception
            //Person realPerson = person;

            //Console.WriteLine("I'm the real person");
            //Console.WriteLine(string.Format("{0} : {1}", "Name", realPerson.Name));

            dynamic person2 = new { Name = "Test1", Age = 100, Address = "Somewhere" };

            Console.WriteLine();

            PrintMembers(person2);            

            // test method
            person.Talk = (Action)(() => Console.WriteLine("I can talk"));

            person.Talk();

            // test function
            person.CalculateNumber = (Func<int, int, int>)((fist, second) => fist + second);

            Console.WriteLine(string.Format("I can calculate numbers : {0}", person.CalculateNumber(10, 10)));

            Console.ReadLine();
        }

        static void PrintMembers(dynamic objectThatNeedToBePrinted)
        {
            // iterate the member can only be implemented to expando object
            IDictionary<string, object> dictionary = objectThatNeedToBePrinted as IDictionary<string, object>;

            // do not continue if the object cannot be cast to dictionary
            if (dictionary == null)
            {
                Console.WriteLine("Cannnot print object");
                return;
            }

            foreach (var member in dictionary)
            {
                Console.WriteLine(string.Format("{0} : {1}", member.Key, member.Value));
            }
        }
    }
}
