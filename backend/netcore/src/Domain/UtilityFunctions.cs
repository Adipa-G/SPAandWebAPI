using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading;

namespace Domain
{
    public static class UtilityFunctions
    {
        private const string DateFormat = "yyyy-MM-ddTHH:mm:ss";

        public static string Timestamp(this DateTime dateTime)
        {
            return dateTime.ToString(DateFormat);
        }

        public static DateTime Timestamp(this string dateTime)
        {
            return DateTime.ParseExact(dateTime, DateFormat, Thread.CurrentThread.CurrentCulture);
        }

        public static string CalcSha512(this string value)
        {
            var sha512 = SHA512.Create();
            var input = Encoding.UTF8.GetBytes(value);
            var hashed = sha512.ComputeHash(input);
            return Encoding.UTF8.GetString(hashed);
        }
    }
}
