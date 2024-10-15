@echo off

REM get current day
for /f %%a in ('date /t') do set DAY=%%a 
echo Today is %Day%

if %Day%==Mon goto runscript
if %Day%==Tue goto runscript
if %Day%==Wed goto runscript
if %Day%==Thu goto runscript
if %Day%==Fri goto runscript
if %Day%==Sat goto runscript
if %Day%==Sun goto runscript
goto notrun

:runscript
setlocal EnableExtensions DisableDelayedExpansion
if "%~1" == "" (
    rem Get local date and time in a region independent format.
    for /F "tokens=2 delims==." %%I in ('%SystemRoot%\System32\wbem\wmic.exe OS get LocalDateTime /VALUE') do set "LocalDateTime=%%I"
) else (
    rem This is for fast testing determining the date of yesterday from any
    rem date specified as parameter in format yyyyMMdd on calling this batch
    rem file from within a command prompt window. The parameter string is
    rem not validated at all as this is just for testing the code below.
    set "LocalDateTime=%~1"
)

rem Get day, month and year from the local date/time string (or parameter).
set "Day=%LocalDateTime:~6,2%"
set "Month=%LocalDateTime:~4,2%"
set "Year=%LocalDateTime:~0,4%"

rem Define a variable with today's date in format MM/dd/yyyy.
@REM set "Today=%Year%-%Month%-%Day%"
set "Today=2017-06-20"


cd C:\files_license 
C:\curl-7.51.0\curl http://10.254.23.122:8983/solr/select/?q=type_t:"license"^&fq^=update_time:\[%Today%T00:00:00Z+TO+%Today%T23:59:59Z\]^&wt^=json^&indent^=true^&start^=0^&rows^=1000000^&fl^=score,IpAdress_t,_ver_t,access_t,birth_district_t,birth_province_t,birth_village_t,cat_t,changelog_t,counted_t,create_new_t,create_newm_t,create_year_t,data,dateofbirth_t,deleted,deleted_t,district_t,division_no_t,editedby_t,examdate_A_t,examdate_B_t,examdate_C_t,examdates_t,examtypes_t,expire_date_t,groupid_t,id,id_t,in_t,issue_date_t,issue_place_g_t,issue_place_t,issueat_t,last_printed_date_t,last_printed_month_t,license_no_t,log_t,modify_date,modify_date_t,monthly_t,name_t,nationality_inter_t,nationality_lao_t,note_id_t,object_id_t,occupation_t,owner_t,parent_id_t,photo_t,print_count_t,print_date_1_t,print_date_2_t,print_date_3_t,print_no_1_t,print_no_2_t,print_no_3_t,print_user_1_t,print_user_2_t,print_user_3_t,printedat_t,printlog_t,province_abbr_t,province_code_t,province_no_t,province_t,rName_t,r_printed_t,recordPrint_t,remark1_t,remark_t,root_t,today_t,type_t,update_time,update_time_t,village_t,yearBith_t >update_data.json

ren update_data.json update_data_%Today%.json
echo Rename file success!
echo Rename file : update_data_%Today%.json


timeout 100
exit
