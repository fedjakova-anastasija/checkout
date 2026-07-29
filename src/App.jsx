import React, { useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Link,
  SegmentedButtons,
  TextField,
  buttonVariantEnum,
  buttonWidthEnum,
} from '../dist/dist/index.jsx';

const bookingForItems = [
  { id: 'self', label: 'Для себя', value: 'self' },
  { id: 'other', label: 'Для другого', value: 'other' },
];

const payStageItems = [
  { id: 'later', label: 'Оплатить потом', value: 'later' },
  { id: 'now', label: 'Оплатить сейчас', value: 'now' },
];

const paymentGroups = {
  later: {
    notice: 'Сейчас вы не платите за бронирование!',
    rules: 'Правила отмены бронирования',
    items: [
      {
        value: 'card',
        icon: 'card',
        title: 'Гарантия банковской картой.',
        suffix: 'Без предоплаты',
        description: 'Сейчас вы ничего не платите. Укажите данные карты для гарантии бронирования.',
      },
      {
        value: 'hotel',
        icon: 'hotel',
        title: 'При заселении.',
        suffix: 'Без предоплаты',
      },
      {
        value: 'transfer',
        icon: 'bank',
        title: 'Банковский перевод для физлиц.',
        suffix: 'Предоплата',
        percentages: ['50%', '60%'],
      },
    ],
  },
  now: {
    notice: 'Бесплатная отмена до 28 ноября, 00:00.',
    rules: 'Правила отмены бронирования',
    items: [
      {
        value: 'bank-card',
        icon: 'visa',
        title: 'Банковская карта.',
        suffix: 'Предоплата 100%',
      },
    ],
  },
};

function App() {
  const [bookingFor, setBookingFor] = useState('self');
  const [payStage, setPayStage] = useState('later');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isArrivalOpen, setIsArrivalOpen] = useState(false);
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isBedsOpen, setIsBedsOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(true);
  const [checks, setChecks] = useState({ sms: false, marketing: false, rules: false });
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    guest1LastName: '',
    guest1FirstName: '',
    guest1MiddleName: '',
    guest2LastName: '',
    guest2FirstName: '',
    guest2MiddleName: '',
    arrival: '00:00',
    departure: '23:00',
    beds: 'Не важно',
  });

  const currentGroup = paymentGroups[payStage];

  const amountNow = useMemo(() => (payStage === 'now' ? '4 000 ₽' : '0 ₽'), [payStage]);
  const primaryCta = payStage === 'now' ? 'Оплатить' : 'Забронировать';

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleCheck(name, value) {
    setChecks((current) => ({ ...current, [name]: value }));
  }

  function changePayStage(value) {
    setPayStage(value);
    setSelectedPayment(paymentGroups[value].items[0].value);
    setIsRulesOpen(true);
  }

  return (
    <div className="checkout-page">
      <div className="site-shell">
        <div className="checkout-module">
          <header className="checkout-header">
            <div className="header-box-row">
              <div className="header-field-box">
                <span className="header-label">Заезд - Выезд</span>
                <strong>1 декабря - 2 декабря</strong>
              </div>
              <div className="header-field-box header-field-box-short">
                <span className="header-label">Гости</span>
                <strong>2 взрослых</strong>
              </div>
            </div>

            <div className="header-actions">
              <div className="header-flag" />
              <div className="header-currency">RUB</div>
              <div className="header-login-wrap">
                <span className="header-user-icon" />
                <div className="header-login">Войти</div>
              </div>
            </div>
          </header>

          <div className="checkout-stepbar">
            <Link className="checkout-back"><span className="back-arrow">‹</span> К услугам</Link>
            <h1>Введите данные гостей</h1>
            <span className="checkout-stepbar-spacer" />
          </div>
          <div className="checkout-stepbar-line" />

          <div className="checkout-content-wrap">
            <div className="checkout-grid">
              <div className="checkout-content">
                <Card title="Введите свои данные">
                  <div className="inline-row top-row">
                    <span className="muted-title">Я бронирую</span>
                    <SegmentedButtons
                      hasError={false}
                      items={bookingForItems}
                      name="booking-for"
                      onChangeAction={setBookingFor}
                      value={bookingFor}
                    />
                  </div>

                  <div className="inner-divider" />

                  <div className="inline-row auth-row">
                    <p className="plain-copy">Авторизуйтесь удобным способом - данные заполнятся автоматически. Или введите их вручную.</p>
                    <div className="social-icons">
                      <span className="icon-box vk">VK</span>
                      <span className="icon-box t">T</span>
                      <span className="icon-box s">S</span>
                      <span className="icon-box a">A</span>
                    </div>
                  </div>

                  <div className="inner-divider" />

                  <div className="fields-grid">
                    <Input value={form.lastName} placeholder="Фамилия" onChange={(value) => updateField('lastName', value)} />
                    <Input value={form.firstName} placeholder="Имя" onChange={(value) => updateField('firstName', value)} />
                    <Input value={form.middleName} placeholder="Отчество" onChange={(value) => updateField('middleName', value)} />
                    <div />
                    <InputWithIcon type="phone" value={form.phone} placeholder="Номер телефона" onChange={(value) => updateField('phone', value)} />
                    <InputWithIcon type="mail" value={form.email} placeholder="Электронная почта" onChange={(value) => updateField('email', value)} />
                  </div>

                  <div className="checkbox-list">
                    <Checkbox checked={checks.sms} label={<span>Пришлите мне подтверждение на телефон</span>} onChange={(value) => toggleCheck('sms', value)} />
                    <Checkbox checked={checks.marketing} label={<span>Я даю <Link underlined>согласие</Link> на получение специальных предложений и новостей</span>} onChange={(value) => toggleCheck('marketing', value)} />
                    <Checkbox checked={checks.rules} label={<span>Я даю <Link underlined>согласие на обработку персональных данных</Link> и подтверждаю ознакомление с <Link underlined>правилами отмены бронирования</Link>, <Link underlined>пользовательским соглашением</Link> и <Link underlined>политикой конфиденциальности</Link></span>} onChange={(value) => toggleCheck('rules', value)} />
                  </div>
                </Card>

                {bookingFor === 'other' ? (
                  <Card title="Введите данные гостей">
                    <GuestFields
                      title="Гость 1:"
                      values={{
                        lastName: form.guest1LastName,
                        firstName: form.guest1FirstName,
                        middleName: form.guest1MiddleName,
                      }}
                      onChange={(name, value) => updateField(name, value)}
                      names={{
                        lastName: 'guest1LastName',
                        firstName: 'guest1FirstName',
                        middleName: 'guest1MiddleName',
                      }}
                    />

                    <div className="inner-divider" />

                    <GuestFields
                      title="Гость 2:"
                      values={{
                        lastName: form.guest2LastName,
                        firstName: form.guest2FirstName,
                        middleName: form.guest2MiddleName,
                      }}
                      onChange={(name, value) => updateField(name, value)}
                      names={{
                        lastName: 'guest2LastName',
                        firstName: 'guest2FirstName',
                        middleName: 'guest2MiddleName',
                      }}
                    />
                  </Card>
                ) : null}

                <Card title="Дополнительно">
                  <div className="subsection">
                    <h3>Время заезда и выезда</h3>
                    <div className="fields-grid">
                      <SelectLike
                        isOpen={isArrivalOpen}
                        label="Заезд"
                        onOptionSelect={(value) => {
                          updateField('arrival', value);
                          setIsArrivalOpen(false);
                        }}
                        onToggle={() => {
                          setIsArrivalOpen((current) => !current);
                          setIsDepartureOpen(false);
                          setIsBedsOpen(false);
                        }}
                        options={[
                          '00:00 - бесплатно',
                          '00:30 - бесплатно',
                          '01:00 - бесплатно',
                          '01:30 - бесплатно',
                          '02:00 - бесплатно',
                          '02:30 - бесплатно',
                        ]}
                        value={form.arrival}
                      />
                      <SelectLike
                        isOpen={isDepartureOpen}
                        label="Выезд"
                        onOptionSelect={(value) => {
                          updateField('departure', value);
                          setIsDepartureOpen(false);
                        }}
                        onToggle={() => {
                          setIsDepartureOpen((current) => !current);
                          setIsArrivalOpen(false);
                          setIsBedsOpen(false);
                        }}
                        options={[
                          '21:30 - бесплатно',
                          '22:00 - бесплатно',
                          '22:30 - бесплатно',
                          '23:00 - бесплатно',
                          '23:30 - 50 ₽ поздний выезд',
                          '23:59 - 100 ₽ поздний выезд',
                        ]}
                        value={form.departure}
                      />
                    </div>
                  </div>

                  <div className="inner-divider" />

                  <div className="subsection">
                    <h3>Предпочтения</h3>
                    <p className="subnote">Выполнение особых пожеланий не гарантируется</p>
                    <div className="fields-grid single-column-grid">
                      <SelectLike
                        iconMode="beds"
                        isOpen={isBedsOpen}
                        label="Кровати"
                        onOptionSelect={(value) => {
                          updateField('beds', value);
                          setIsBedsOpen(false);
                        }}
                        onToggle={() => {
                          setIsBedsOpen((current) => !current);
                          setIsArrivalOpen(false);
                          setIsDepartureOpen(false);
                        }}
                        options={['Не важно', 'две односпальные кровати', 'две полутораспальные кровати']}
                        value={form.beds}
                      />
                    </div>
                  </div>
                </Card>

                <div className="register-banner">
                  <div className="register-left">
                    <div className="register-badge">🏅</div>
                    <div className="register-text">Воспользуйтесь скидкой за регистрацию и сэкономьте 800 ₽</div>
                  </div>
                  <Button variant={buttonVariantEnum.accent}>Зарегистрироваться</Button>
                </div>

                <Card title="Выберите способ оплаты">
                  <div className="payment-stage-row">
                    <SegmentedButtons
                      hasError={false}
                      items={payStageItems}
                      name="payment-stage"
                      onChangeAction={changePayStage}
                      value={payStage}
                    />
                  </div>

                  <div className="payment-rules-wrap">
                    <div className="payment-rules-row">
                      <span className="payment-return-icon">↩</span>
                      <span>{currentGroup.notice}</span>
                      <button className="rules-link-button" onClick={() => setIsRulesOpen((current) => !current)} type="button">{currentGroup.rules}</button>
                    </div>
                    {isRulesOpen ? (
                      <div className="rules-popover">
                        <div className="rules-popover-header">
                          <strong>Правила отмены</strong>
                          <button className="rules-popover-close" onClick={() => setIsRulesOpen(false)} type="button">×</button>
                        </div>
                        <p>
                          Бесплатная отмена бронирования возможна до 28.11.2026 0:00 (UTC +03:00). При отмене бронирования после 28.11.2026 0:00 (UTC +03:00) взимается 50% от размера предоплаты.
                        </p>
                        <span className="rules-popover-arrow" />
                      </div>
                    ) : null}
                  </div>

                  <div className="payment-options-list">
                    {currentGroup.items.map((option) => (
                      <button
                        key={option.value}
                        className={option.value === selectedPayment ? 'payment-option payment-option-active' : 'payment-option'}
                        onClick={() => setSelectedPayment(option.value)}
                        type="button"
                      >
                        <div className="payment-option-main">
                          <div className="payment-option-icon-wrap">
                            <PaymentIcon type={option.icon} />
                          </div>
                          <div className="payment-option-content">
                            <div className="payment-option-title-row">
                              <div className="payment-option-title-wrap">
                                <strong>{option.title}</strong>
                                <span>{option.suffix}</span>
                                {option.percentages ? (
                                  <div className="payment-percentages">
                                    {option.percentages.map((percent) => (
                                      <span key={percent} className="payment-percentage">{percent}</span>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                              <span className={option.value === selectedPayment ? 'payment-circle payment-circle-active' : 'payment-circle'} />
                            </div>
                            {option.description ? (
                              <p className="payment-option-description">
                                {option.description} <Link underlined>Подробнее</Link>
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>

                <div className="security-note">
                  <strong>Гарантии безопасности</strong>
                  <p>
                    Ввод данных и обработка платежа банковской картой проходят на защищённой странице процессинговой системы, которая прошла международную сертификацию. Конфиденциальные данные полностью защищены.
                  </p>
                  <div className="security-logos">
                    <span>PCI DSS</span>
                    <span>ID Check</span>
                    <span>VISA Secure</span>
                  </div>
                </div>
              </div>

              <aside className="summary-column">
                <div className="summary-card">
                  <div className="summary-card-header">
                    <h2>Ваше бронирование</h2>
                  </div>

                  <div className="summary-panel summary-panel-accent summary-panel-top">
                    <div className="summary-days">2 дня</div>
                    <div className="summary-dates">1 декабря - 2 декабря</div>
                    <div className="summary-weekdays-row">
                      <span>Вторник<br />с 00:00</span>
                      <span>Среда<br />до 23:00</span>
                    </div>
                  </div>

                  <div className="summary-panel summary-panel-accent room-panel">
                    <div className="summary-row"><strong>Дом:</strong><strong>4 000 ₽</strong></div>
                    <button className="room-toggle-button" onClick={() => setIsRoomOpen((current) => !current)} type="button">
                      <span>Одноместный</span>
                      <span className={isRoomOpen ? 'tiny-chevron tiny-chevron-up' : 'tiny-chevron tiny-chevron-down'} />
                    </button>
                  </div>

                  {isRoomOpen ? (
                    <>
                      <div className="summary-panel">
                        <div className="summary-row summary-row-strong"><span>2 взрослых на основном месте</span><span>4 000 ₽</span></div>
                        <div className="summary-discount-line"><span>Скидка 15% за регистрацию</span><span>4 000 ₽</span></div>
                        <div className="summary-dashed" />
                        <div className="summary-services-title">Услуги</div>
                        <div className="summary-row"><span>Завтрак "Английский"</span><span>Вкл.</span></div>
                      </div>

                      <div className="summary-panel total-panel">
                        <div className="summary-register-row">
                          <span className="summary-register-chip">За регистрацию 3 200 ₽ <span className="tiny-chevron tiny-chevron-right" /></span>
                        </div>
                        <div className="summary-total-line"><strong>Итого</strong><div className="summary-total-value">4 000 ₽</div></div>
                        <div className="summary-tax">Налоги и сборы включены</div>
                      </div>
                    </>
                  ) : null}

                  <div className="summary-panel pay-panel">
                    <div className="summary-row pay-now-row"><strong>К оплате сейчас</strong><strong>{amountNow}</strong></div>
                    <div className="summary-row pay-later-row"><span>{payStage === 'now' ? 'После оплаты' : 'До заезда'}</span><span>{payStage === 'now' ? '0 ₽' : '4 000 ₽'}</span></div>
                    <Button variant={buttonVariantEnum.primary} width={buttonWidthEnum.full}>{primaryCta}</Button>
                  </div>

                  <div className="summary-footer-link">
                    <button className="details-link-button" onClick={() => setIsDetailsOpen(true)} type="button">
                      Детализация бронирования <span className="details-open-arrow">↗</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <footer className="checkout-footer">
            <span>© Модуль онлайн-бронирования TravelLine: Booking Engine</span>
            <Link underlined>Номера записей в Едином реестре объектов классификации</Link>
          </footer>
        </div>
      </div>

      {isDetailsOpen ? <BookingDetailsModal onClose={() => setIsDetailsOpen(false)} /> : null}
    </div>
  );
}

function Card({ children, title }) {
  return (
    <section className="content-card">
      <div className="content-card-header">
        <h2>{title}</h2>
      </div>
      <div className="content-card-body">{children}</div>
    </section>
  );
}

function GuestFields({ names, onChange, title, values }) {
  return (
    <div className="guest-fields-block">
      <h3>{title}</h3>
      <div className="fields-grid">
        <Input value={values.lastName} placeholder="Фамилия" onChange={(value) => onChange(names.lastName, value)} />
        <Input value={values.firstName} placeholder="Имя" onChange={(value) => onChange(names.firstName, value)} />
        <Input value={values.middleName} placeholder="Отчество" onChange={(value) => onChange(names.middleName, value)} />
        <div />
      </div>
    </div>
  );
}

function Input({ onChange, placeholder, value }) {
  return <TextField onChange={(event) => onChange(event.target.value)} placeholder={placeholder} showTooltip={false} value={value} />;
}

function InputWithIcon({ onChange, placeholder, type, value }) {
  return (
    <div className="input-with-icon">
      <span className={type === 'phone' ? 'field-icon field-icon-phone' : 'field-icon field-icon-mail'} />
      <TextField className="with-left-icon" onChange={(event) => onChange(event.target.value)} placeholder={placeholder} showTooltip={false} value={value} />
    </div>
  );
}

function SelectLike({ iconMode, isOpen = false, label, onOptionSelect, onToggle, options, value }) {
  return (
    <div className="select-like-wrap">
      <span className="select-like-label">{label}</span>
      <button className={isOpen ? 'select-like-trigger select-like-trigger-open' : 'select-like-trigger'} onClick={onToggle} type="button">
        <TextField readOnly showTooltip={false} value={value} />
        <span className={isOpen ? 'select-like-arrow select-like-arrow-open' : 'select-like-arrow'} />
      </button>
      {isOpen && options.length > 0 ? (
        <div className={iconMode === 'beds' ? 'select-dropdown select-dropdown-beds' : 'select-dropdown'}>
          {options.map((option, index) => (
            <button className={index === 0 ? 'select-dropdown-option select-dropdown-option-active' : 'select-dropdown-option'} key={option} onClick={() => onOptionSelect(iconMode === 'beds' ? option : option.slice(0, 5))} type="button">
              {iconMode === 'beds' && index > 0 ? <span className={index === 1 ? 'bed-icon bed-icon-single' : 'bed-icon bed-icon-double'} /> : null}
              <span>{option}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PaymentIcon({ type }) {
  if (type === 'visa') {
    return (
      <div className="payment-icon-visa-group">
        <span className="card-logo visa-logo">VISA</span>
        <span className="card-logo mc-logo" />
      </div>
    );
  }

  return <span className={`payment-method-icon payment-method-icon-${type}`} />;
}

function BookingDetailsModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="details-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="details-modal-header">
          <h2>Детализация бронирования</h2>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>

        <div className="details-modal-body">
          <div className="details-top-meta">
            <div><strong>2 дня</strong> 1 декабря - 2 декабря</div>
            <div><strong>2 гостя</strong> 2 взрослых</div>
            <div><strong>Тариф</strong> Скидка 15% за регистрацию</div>
          </div>

          <div className="details-rules-button">Правила отмены бронирования <span className="tiny-chevron tiny-chevron-down" /></div>

          <div className="details-table">
            <div className="details-table-head">Дом 1: Одноместный</div>
            <div className="details-row"><span>Размещение</span><span>2 взрослых</span><span>4 000 ₽</span></div>
            <div className="details-table-head">Услуги</div>
            <div className="details-row"><span>Завтрак "Английский"</span><span></span><span>Включено в стоимость</span></div>
            <div className="details-total-row">
              <div>
                <strong>Общая стоимость:</strong> <span className="details-total-price">4 000 ₽</span>
                <div className="summary-tax">Налоги и сборы включены</div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-modal-footer">
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
