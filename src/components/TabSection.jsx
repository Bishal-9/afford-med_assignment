import { useEffect, useState } from "react"
import { Box, Tab, Tabs } from "@mui/material"
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

const tabList = [
    {
        id: 1,
        name: 'Bakery',
    }, {
        id: 2,
        name: 'Fruit and Vegetables'
    }, {
        id: 3,
        name: 'Meat and fish'
    }, {
        id: 4,
        name: 'Drinks'
    }, {
        id: 5,
        name: 'Kitchen'
    }, {
        id: 6,
        name: 'Special nutrition'
    },
]

const TabSection = () => {

    const [selectedTab, setSelectedTab] = useState(1)

    return (
        <Box>
            <Tabs
                value={selectedTab}
                onChange={(e, v) => setSelectedTab(tabList.find(tab => tab.id === v).id)}
                sx={{ width: '100%', background: '#f9f9f9', padding: '0px 30px' }}
            >
                {
                    tabList.map(tab => (
                        <Tab
                            key={tab.id}
                            label={tab.name}
                            icon={<KeyboardArrowDownRoundedIcon />}
                            iconPosition='end'
                            value={tab.id}
                            sx={{
                                fontWeight: '500',
                                fontSize: '15px',
                                lineHeight: '22px',
                            }}
                        />
                    ))
                }
            </Tabs>
        </Box>
    )
}

export default TabSection