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
                        <a href="">
                            <img src={watsLogo} alt="" />
                        </a>
                        <a href="">
                            <img src={telegLogo} alt="" />
                        </a>
                        <a href="">+7 (960) 077-81-11 </a>
                        <button onClick={() => setPopupOpen(true)}>продать квартиру</button>
                    </nav>
                </section>
                <section className={style.onMobile}>
                    <div>
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                        
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
                            <a href="/new-building-complexes">Новостроки</a>
                        </div>
                        <div className="">
                            <a href="/ready-apartments">Готовые кварирвы</a>
                        </div>
                        <div className="">
                            <a href="/rental-apartments">Арендаквартир</a>
                        </div>
                        <div className="">
                            <a href="/country-properties">Загодная</a>
                        </div>
                        <div className="">
                            <a href="/commercial-properties">Коммерческая</a>
                        </div>
                        <div className="">
                            <a href="">Агенство</a>
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