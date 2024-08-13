import { useDispatch, useSelector } from "react-redux";
import { totalThunks } from "../store/salesApiSlice";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../functions/DateConverter";

function useSalesData() {
    console.log("!!!!use Sales Data!!!");
    const [todayDate, setTodayDate] = useState(null);
    const [currentDate,setCurrentDate] = useState(null)
    const [todayValue, setTodayValue] = useState(null);
    const [predictTodayValue, setPredictTodayValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictDetailValue, setPredictDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [rankCompareValue, setRankCompareValue] = useState(null);
    const [rankDetailValue, setRankDetailValue] = useState(null);
    const [lastDetailValue, setLastDetailValue] = useState(null);
    const [predictLastValue, setPredictLastValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictNextValue, setPredictNextValue] = useState(null)
    const [menuObject, setMenuObject] = useState({});
    const [isLoadingState, setIsLoadingState] = useState(true);
    const validDateList = useRef([])
    const isLoading = useSelector((state) => state.sale.isLoading);
    const totalData = useSelector((state) => state.sale.totalData);

    useEffect(() => {
        if (!isLoading) {
            console.log(totalData);
            setTodayDate(formatDate(new Date()))
            setCurrentDate(totalData['date'])
            setTodayValue(totalData['today']);
            setPredictTodayValue(totalData['predictToday']);
            setPredictDetailValue(totalData['predictDetail']);
            setPredictNextValue(totalData['predictNext'])
            setRankCompareValue(totalData['rankCompare']);
            setPredictLastValue(totalData['predictLast'])
            setRankDetailValue(totalData['rankDetail']);
            if (totalData['menuList'].length !== 0) {
                const menuList = totalData['menuList']
                let obj = {};
                menuList.forEach((element) => {
                    obj[element.name] = { price: element.price, img: element.img };
                });
                setMenuObject(obj);
            }
            
            setLastDetailValue(totalData['lastDetail'])
            setIsLoadingState(false);
            }
        else{
            setIsLoadingState(true)
        }
    }, [isLoading, totalData]); // totalData를 의존성 배열에 추가

    useEffect(()=>{
        if(rankCompareValue !== null && todayDate !== null && currentDate !== null&& todayDate === currentDate){
            console.log(rankCompareValue)
            console.log(todayDate)
            console.log(currentDate)
            console.log(todayDate)
            let list = []
            list.push(todayDate)
            for(let date of Object.keys(rankCompareValue['monthly']) ){
                if (rankCompareValue['monthly'][date].length !== 0){
                    let lastday = new Date(date)
                    lastday.setMonth(lastday.getMonth() + 1)
                    lastday.setDate(0)
                    console.log(formatDate(lastday))
                    list.push(formatDate(lastday))
                }
            }
            validDateList.current = [...list]
        }

    },[rankCompareValue,todayDate,currentDate])


   
    return { todayDate,currentDate,isLoadingState, todayValue, predictTodayValue, predictDetailValue, predictLastValue ,predictNextValue,rankDetailValue, rankCompareValue, menuObject , lastDetailValue , validDateList};
}

export default useSalesData;
