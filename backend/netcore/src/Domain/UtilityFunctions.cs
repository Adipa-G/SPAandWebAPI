using System;
using System.Threading;

namespace Domain;

public static class UtilityFunctions
{
    private const string DateFormat = "yyyy-MM-ddTHH:mm:ss";

    public static string Timestamp(this long dateTimeTicks)
    {
        return new DateTime(dateTimeTicks).ToString(DateFormat);
    }

    public static DateTime Timestamp(this string dateTime)
    {
        return DateTime.ParseExact(dateTime, DateFormat, Thread.CurrentThread.CurrentCulture);
    }
}