import sys

vin_to_num = {
    'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,
    'J':1,'K':2,'L':3,'M':4,'N':5,'P':7,'R':9,'S':2,
    'T':3,'U':4,'V':5,'W':6,'X':7,'Y':8,'Z':9,'1':1,
    '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'0':0,
}
vin_weighter = [8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2]

header_mul_sum = 0

def cal_Vin(header,footer,num=1):
    header_mul_sum = 0
    footer_mul_sum = 0
    vin_list = []
    footer_list = [footer,]
    vin_Twelve_Seventeen = footer[2:]
    vin_Twelve_Seventeen_int = int(vin_Twelve_Seventeen)
    for i in range(num-1):
        vin_Twelve_Seventeen_int += 1 
        if vin_Twelve_Seventeen_int <999999:
            vin_Ten_Seventeen = footer[:2]+str(vin_Twelve_Seventeen_int)
            footer_list.append(vin_Ten_Seventeen)
    print(footer_list)
    for i in range(len(header)):
        cal_header_mul = vin_to_num[header[i]]*vin_weighter[i]
        header_mul_sum  += cal_header_mul
    for element in footer_list:
        for i in range(len(footer)):
            vin_char = vin_to_num[footer[i]]
            if len(footer) == 8:
                footer_mul = vin_char*vin_weighter[9+i]
                footer_mul_sum += footer_mul
            else:
                print('Please input 8 length string!!!')
        check_bit = (header_mul_sum + footer_mul_sum)%11
        if check_bit == 10:
            vin_check = 'X'
        else:
            vin_check = str(check_bit)
        vin = header + vin_check + element
        vin_list.append(vin)
    return vin_list


if __name__ == '__main__':
    print(cal_Vin('UU6JA696','1D713820',num = 5))