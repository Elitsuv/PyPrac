n = int(input("enter a number"))
s = 1
for i in range(1,n+1):
    s*=n
    n -= 1
print(s)