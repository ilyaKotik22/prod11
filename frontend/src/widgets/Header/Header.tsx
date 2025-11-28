import React, { useState } from 'react';
import style from './Header.module.scss'
import logo from '../../../public/Bez44ona3.png'
import watsLogo from '../../../public/whatsappLogo.svg'
import telegLogo from '../../../public/telegramLogo.svg'
import HeaderCallPopup from './HeaderPoupup/HeaderPopup';
import { useNavigate } from 'react-router-dom';
export const Header: React.FC = () => {
    const [dropDownActive,setDropDown] = useState<boolean>(false)
    const navigate = useNavigate()
    const [popupOpen, setPopupOpen] = useState(false);

    return (
        
            <header className={style.header}>
                <section className={style.leftHalf}>
                    <nav>
                        <div onClick={()=>navigate('/')}>
                            <img src={logo} alt="logo" />
                        </div>
                        <div onClick={()=>navigate('/new-building-complexes')} >Новостроки</div>
                        <div onClick={()=>navigate('/ready-apartments')} >Готовые кварирвы</div>
                        <div onClick={()=>navigate('/rental-apartments')}>Арендаквартир</div>
                        <div onClick={()=>navigate('/country-properties')} >Загородная</div>
                        <div onClick={()=>navigate('/commercial-properties')}>Коммерческая</div>
                        <div onClick={()=>navigate('/')}>Агенство</div>
                    </nav>
                </section>
                <section className={style.rightHalf} >
                    <nav>
                        <div onClick={()=>navigate('/')}>
                            <img src={watsLogo} alt="" />
                        </div>
                        <div onClick={()=>navigate('/')}>
                            <img src={telegLogo} alt="" />
                        </div>
                        <div onClick={()=>navigate('/')}>+7 (960) 077-81-11 </div>
                        <button onClick={() => setPopupOpen(true)}>продать квартиру</button>
                    </nav>
                </section>
                <section className={style.onMobile}>
                    <div>
                        <div onClick={()=>navigate('/')}>
                            <img src={logo} alt="logo" />
                        </div>
                        
                    </div>
                    <div style={{display: dropDownActive ? 'block' : 'none'}} className={style.dropdownMenu}>
                        <div className={style.header}>
                            <div className="">+7 (495) 255-01-61</div>
                            <div className="">
                                <div className="">
                                <img src={watsLogo} alt="watsap" />
                                </div>
                                <div className="">
                                <img src={telegLogo} alt="tg" />
                                </div>    
                            </div>
                            
                        </div>
                        <div className="">
                            <div onClick={()=>navigate('/new-building-complexes')} >Новостроки</div>
                        </div>
                        <div className="">
                            <div onClick={()=>navigate('/ready-apartments')}>Готовые кварирвы</div>
                        </div>
                        <div className="">
                            <div onClick={()=>navigate('/rental-apartments')} >Арендаквартир</div>
                        </div>
                        <div className="">
                            <div onClick={()=>navigate('/country-properties')} >Загодная</div>
                        </div>
                        <div className="">
                            <div onClick={()=>navigate('/commercial-properties')} >Коммерческая</div>
                        </div>
                        <div className="">
                            <div onClick={()=>navigate('/')}>Агенство</div>
                        </div>
                        <div className=""><button onClick={() => setPopupOpen(true)}>Заказать звонок</button></div>
                        
                    </div>
                    <div onClick={()=> setDropDown((el)=> !el)} className={style.burgerMenu}>
                        <div>.</div>
                        <div>.</div>
                        <div>.</div>
                    </div>
                </section>
                <HeaderCallPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
            </header>

       

    );
};