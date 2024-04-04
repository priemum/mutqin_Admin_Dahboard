import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { axisClasses } from '@mui/x-charts';

function UserDetailsChart({userInfo}) {
  const [chartWidth, setChartWidth] = useState(100);

  const chartSetting = {
    yAxis: [
      {
     
      },
    ],
    width:chartWidth,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const dataset = [
    {
      images: 0,
      words: 0,
      month: 'Jan',
    },
    {
      images: 0,
      words: 0,
      month: 'Fev',
    },
    {
      images: 0,
      words: 0,
      month: 'Mar',
    },
    {
      images: 0,
      words: 0,
      month: 'Apr',
    },
    {
      images: 0,
      words: 0,
      month: 'May',
    },
    {
      images: 0,
      words: 0,
      month: 'June',
    },
    {
      images: 0,
      words: 0,
      month: 'July',
    },
    {
      images: 0,
      words: 0,
      month: 'Aug',
    },
    {
      images: 0,
      words: 0,
      month: 'Sept',
    },
    {
      images: 0,
      words: 0,
      month: 'Oct',
    },
    {
      images: 0,
      words: 0,
      month: 'Nov',
    },
    {
      images: 0,
      words: 0,
      month: 'Dec',
    },
  ];


  
  const valueFormatter = (value) => `${value}`;
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 1); // Adjust as needed
      }
      {
        setChartWidth(300);
      }
      if (window.innerWidth < 768 && window.innerWidth < 1020) {
        setChartWidth(window.innerWidth - 60); // Adjust as needed
      } else {
        setChartWidth(450);
      }
      if (window.innerWidth > 1020) {
        setChartWidth(650); // Adjust as needed
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <div className="">
      
        <div className="">
          <div >
    
            <div className=' w-100  bg-xy m-1 '>
            <BarChart
            dataset={userInfo?.words_images_generated_graph||dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'images', label: 'Images', valueFormatter, color: '#003087' }, // Change the color for Images
              { dataKey: 'words', label: 'Words', valueFormatter, color: '#ed5ab3' },   // Change the color for Words
            ]}
            
            {...chartSetting}
          />
            
      
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsChart;
