import {FC, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {ScrollTop} from './components/ScrollTop'
import {PageDataProvider, useLayout} from './core'
import {themeModeSwitchHelper, useThemeMode} from '../partials/layout/theme-mode/ThemeModeProvider'
import {MenuComponent} from '../assets/ts/components'
import {WithChildren} from '../helpers'

const MasterLayout: FC<WithChildren> = ({children}) => {
    const {classes} = useLayout()
    const {mode} = useThemeMode()
    const location = useLocation()

    useEffect(() => {
        setTimeout(() => {
            MenuComponent.reinitialization()
        }, 500)
    }, [location.key])

    useEffect(() => {
        themeModeSwitchHelper(mode)
    }, [mode])

    return (
        <PageDataProvider>
            <div className='page d-flex flex-row flex-column-fluid'>
                <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
                    <HeaderWrapper/>
                    <Outlet/>
                    <Footer/>
                    {/*<Spotlight/>*/}
                </div>
            </div>

            <ScrollTop/>
        </PageDataProvider>
    )
}

export {MasterLayout}
