

const scales = {
    x: { 
        display: false, 
        grid: { 
            display: false
        } 
    },
    y: { 
        display: false, 
        grid: { 
            display: false
        }
    }
}
        
        
const plugins = {
    legend: { 
        display: false 
    },
}

const elements = {
    line: {
        borderColor: "black",
        borderWidth: 2,
        tension: 0.1,
        fill: false,
        
    }
}

export const options = {
    scales,
    maintainAspectRatio: false,
    elements,
    plugins,
    animation: false
};