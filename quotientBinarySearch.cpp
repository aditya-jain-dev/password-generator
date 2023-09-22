#include <iostream>
using namespace std;

int quotientBinarySearch(int dividend, int divisor)
{
    int s = 0;
    int e = dividend;
    int m = s + (e - s) / 2;
    int ans = -1;

    while (s <= e)
    {
        if (m * divisor <= dividend)
        {
            s = m + 1;
            ans = m;
        }
        else
        {
            e = m - 1;
        }
        m = s + (e - s) / 2;
    }
    return ans;
}

int main()
{
    int divisor = 7;
    int dividend = -29;
    int ans = quotientBinarySearch(abs(dividend), abs(divisor));

    if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0))
    {
        cout << -ans;
    }
    else
    {
        cout << ans;
    }
}