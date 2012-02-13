using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace ExpressionTreeExercise
{
    class ExpressionTreeHelper
    {
        public static Tuple<TResult, string> FindValueAndName<T, TResult>(T instance, Expression<Func<T, TResult>> expression)
        {
            TResult value = expression.Compile()(instance);

            string name = string.Empty;

            if (expression.Body.NodeType == ExpressionType.Call)
            {
                name = (expression.Body as MethodCallExpression).Method.Name;
            }
            else if (expression.Body.NodeType == ExpressionType.MemberAccess)
            {
                name = (expression.Body as MemberExpression).Member.Name;
            }

            return new Tuple<TResult, string>(value, name);
        }
    }

    class Entity
    {
        public string[] PropertyArray { get; set; }

        public string Property1 { get; set; }

        public string Property2 { get; set; }

        public string SayHello() { return "Hello"; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Entity instance1 = new Entity { Property1 = "a", Property2 = "b", PropertyArray = new String[] { "a1", "a2" } };

            var result = ExpressionTreeHelper.FindValueAndName(instance1, c => c.Property1);

            Console.WriteLine(string.Format("Expression {0} value is {1}", result.Item2, result.Item1));

            result = ExpressionTreeHelper.FindValueAndName(instance1, c => c.SayHello());

            Console.WriteLine(string.Format("Expression {0} value is {1}", result.Item2, result.Item1));

            result = ExpressionTreeHelper.FindValueAndName(instance1, c => c.PropertyArray[0]);

            Console.WriteLine(string.Format("Expression {0} value is {1}", result.Item2, result.Item1));

            Console.ReadLine();
        }
    }
}
