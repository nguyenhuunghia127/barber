document.addEventListener('DOMContentLoaded', () => {
    // --- Image Fallback Handler ---
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            if (!this.getAttribute('data-fallback-applied')) {
                this.setAttribute('data-fallback-applied', 'true');
                this.src = './img/image.png';
            }
        });
    });

    // --- Modal & Confetti Handler ---
    const modalEl = document.getElementById('success-modal');
    const modalCard = document.getElementById('success-modal-card');
    const closeModalX = document.getElementById('close-modal-x');
    const ticketName = document.getElementById('ticket-barber-name');
    const ticketPhone = document.getElementById('ticket-barber-phone');
    const ticketService = document.getElementById('ticket-barber-service');
    const ticketTime = document.getElementById('ticket-barber-time');
    const ticketBranch = document.getElementById('ticket-barber-branch');

    const fireConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 75,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#6366f1']
            });
            setTimeout(() => {
                confetti({
                    particleCount: 45,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 45,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
            }, 250);
        }
    };

    const showSuccessTicket = (details) => {
        if (!modalEl) return;
        if (ticketName) ticketName.textContent = details.name || 'Quý khách';
        if (ticketPhone) ticketPhone.textContent = details.phone || '0906 xxx xxx';
        if (ticketService) ticketService.textContent = details.service || 'Combo Cắt Gội VIP';
        if (ticketTime) ticketTime.textContent = details.time || '18:00 - Hôm nay';
        if (ticketBranch) ticketBranch.textContent = details.branch || 'Chi nhánh 1 (Quận 10)';

        modalEl.classList.remove('hidden');
        modalEl.classList.add('flex');
        void modalEl.offsetWidth;
        modalEl.classList.remove('opacity-0');
        if (modalCard) {
            modalCard.classList.remove('scale-95');
            modalCard.classList.add('scale-100');
        }
        fireConfetti();

        if (window.addNewLiveBooking) {
            window.addNewLiveBooking({
                name: details.name,
                service: details.service,
                serviceEn: details.service,
                timeVi: "Vừa xong",
                timeEn: "Just now",
                avatar: (details.name || 'K').charAt(0).toUpperCase(),
                bg: "bg-blue-600"
            });
        }
    };

    const showModal = (message) => {
        showSuccessTicket({
            name: document.getElementById('cus_name')?.value || 'Quý khách',
            phone: document.getElementById('cus_phone')?.value || '0906 xxx xxx',
            service: document.getElementById('cus_service')?.value || 'Combo Cắt Gội VIP',
            time: (document.getElementById('cus_time')?.value || 'Hôm nay').replace('T', ' '),
            branch: document.getElementById('cus_branch')?.value || 'Chi nhánh 1 (Quận 10)'
        });
    };

    const closeModal = () => {
        if (!modalEl) return;
        modalEl.classList.add('opacity-0');
        if (modalCard) {
            modalCard.classList.remove('scale-100');
            modalCard.classList.add('scale-95');
        }
        setTimeout(() => {
            modalEl.classList.add('hidden');
            modalEl.classList.remove('flex');
        }, 300);
    };

    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeModalX) closeModalX.addEventListener('click', closeModal);
    if (modalEl) {
        modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });
    }


    // --- 0. XỬ LÝ CHUYỂN NGÔN NGỮ (LANGUAGE TOGGLE) ---
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'en'; // MẶC ĐỊNH LÀ TIẾNG ANH
    let updateFinalDateTime = () => {}; // Will be assigned during datetime setup

    const applyLang = (lang) => {
        // Cập nhật html lang attribute
        const htmlRoot = document.getElementById('html-root');
        if (htmlRoot) htmlRoot.setAttribute('lang', lang);

        // Cập nhật chữ trên nút
        if (langToggleBtn) langToggleBtn.innerText = lang === 'en' ? 'VN' : 'EN';

        // Cập nhật toàn bộ các thẻ có class lang-el
        document.querySelectorAll('.lang-el').forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) el.innerHTML = newText;
        });

        // Cập nhật placeholder cho các input có data-placeholder
        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            const newPlaceholder = el.getAttribute(`data-placeholder-${lang}`);
            if (newPlaceholder) el.placeholder = newPlaceholder;
        });

        // ĐỔI NGÔN NGỮ GOOGLE FORM (Đổi link iframe)
        const feedbackIframe = document.getElementById('feedback-form');
        if (feedbackIframe) {
            const newUrl = feedbackIframe.getAttribute(`data-url-${lang}`);
            if (newUrl) feedbackIframe.src = newUrl;
        }

        // Cập nhật visual datetime summary nếu đang chọn
        updateFinalDateTime();
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'vi' : 'en';
            applyLang(currentLang);
        });

        // Kích hoạt tiếng Anh mặc định ngay khi tải trang
        applyLang(currentLang);
    }



    // --- 1. XỬ LÝ MOBILE MENU ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }


    // --- 2. XỬ LÝ ĐẶT LỊCH TRỰC QUAN (SERVICE & DATE-TIME SLOTS SELECTOR) ---
    const datetimeInput = document.getElementById('cus_time');
    const serviceSelect = document.getElementById('cus_service');
    const serviceCards = document.querySelectorAll('.service-card');

    // 2a. Chọn dịch vụ
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Reset active states
            serviceCards.forEach(c => {
                c.classList.remove('border-blue-600', 'bg-blue-50/50', 'ring-4', 'ring-blue-600/10');
                c.classList.add('border-slate-200', 'bg-slate-50');
            });
            // Set active state
            card.classList.remove('border-slate-200', 'bg-slate-50');
            card.classList.add('border-blue-600', 'bg-blue-50/50', 'ring-4', 'ring-blue-600/10');

            // Update hidden select dropdown value
            const value = card.getAttribute('data-value');
            if (serviceSelect) {
                serviceSelect.value = value;
            }
        });
    });

    // State variables for Date & Time Selection
    let selectedDateObj = null; // Date object representing selected day
    let selectedTimeStr = "";  // "HH:MM" format

    const dateTabsContainer = document.getElementById('date-tabs');
    const morningSlotsContainer = document.getElementById('morning-slots');
    const afternoonSlotsContainer = document.getElementById('afternoon-slots');
    const eveningSlotsContainer = document.getElementById('evening-slots');
    const selectedTimeDisplay = document.getElementById('selected-time-display');
    const selectedTimeText = document.getElementById('selected-time-text');

    // --- TIMEZONE CONFIGURATION: Hayward, California (PT / America/Los_Angeles) ---
    // Tiệm đặt tại: 24654 Joyce St, Hayward, CA 94544, Hoa Kỳ
    const SHOP_TIMEZONE = 'America/Los_Angeles';

    // Helper: Lấy thời gian hiện tại chuẩn theo múi giờ địa phương của tiệm (Hayward, CA)
    const getShopNow = () => {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: SHOP_TIMEZONE,
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            });
            const parts = formatter.formatToParts(now);
            const d = {};
            parts.forEach(({ type, value }) => {
                d[type] = parseInt(value, 10);
            });
            return new Date(d.year, d.month - 1, d.day, (d.hour || 0) % 24, d.minute, d.second);
        } catch (e) {
            console.error('Timezone format fallback:', e);
            return new Date();
        }
    };

    // Helper function to pad zeros
    const pad = (num) => String(num).padStart(2, '0');

    // Helper function to check if business is open (Tuesday = 2, Wednesday = 3)
    const isOpenDay = (date) => {
        if (!date) return false;
        const day = date.getDay();
        return day === 2 || day === 3;
    };

    // Format date for display in Vietnamese and English
    const getDayLabel = (date, idx) => {
        if (idx === 0) {
            return { vi: "Hôm nay", en: "Today" };
        }
        const weekdaysVI = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        const weekdaysEN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = date.getDay();
        return {
            vi: weekdaysVI[dayOfWeek],
            en: weekdaysEN[dayOfWeek]
        };
    };

    // 2b. Generate Date Tabs for the next 7 days (based on Hayward, CA time)
    const generateDateTabs = () => {
        if (!dateTabsContainer) return;
        dateTabsContainer.innerHTML = '';

        const now = getShopNow();

        // Find first open day (Tuesday or Wednesday) to auto-select
        let defaultSelectIdx = -1;
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
            if (isOpenDay(checkDate)) {
                defaultSelectIdx = i;
                break;
            }
        }
        if (defaultSelectIdx === -1) defaultSelectIdx = 0;

        for (let i = 0; i < 7; i++) {
            const tempDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);

            const label = getDayLabel(tempDate, i);
            const formattedDateNum = pad(tempDate.getDate());
            const formattedMonth = pad(tempDate.getMonth() + 1);
            const formattedYear = tempDate.getFullYear();

            const dateValStr = `${formattedMonth}/${formattedDateNum}/${formattedYear}`; // m/d/Y format
            const isSelected = i === defaultSelectIdx;
            const open = isOpenDay(tempDate);

            const statusVi = open ? "Mở cửa" : "Nghỉ";
            const statusEn = open ? "Open" : "Closed";
            const statusClass = open ? "text-emerald-600 font-semibold" : "text-slate-400 font-normal";

            const button = document.createElement('button');
            button.type = "button";
            button.setAttribute('data-date-str', dateValStr);
            button.className = `date-tab shrink-0 snap-center flex flex-col items-center justify-center p-3 w-22 rounded-2xl border transition-all ${isSelected
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-bold ring-4 ring-blue-600/10'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100/50 hover:border-slate-300'
                }`;

            button.innerHTML = `
                        <span class="text-xs uppercase tracking-wider lang-el" data-vi="${label.vi}" data-en="${label.en}">${currentLang === 'en' ? label.en : label.vi}</span>
                        <span class="text-xl font-black mt-1">${formattedDateNum}</span>
                        <span class="text-[10px] mt-0.5 lang-el ${statusClass}" data-vi="${statusVi}" data-en="${statusEn}">${currentLang === 'en' ? statusEn : statusVi}</span>
                    `;

            button.addEventListener('click', () => {
                document.querySelectorAll('.date-tab').forEach(t => {
                    t.classList.remove('border-blue-600', 'bg-blue-50/50', 'text-blue-600', 'font-bold', 'ring-4', 'ring-blue-600/10');
                    t.classList.add('border-slate-200', 'bg-slate-50', 'text-slate-700');
                });
                button.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-700');
                button.classList.add('border-blue-600', 'bg-blue-50/50', 'text-blue-600', 'font-bold', 'ring-4', 'ring-blue-600/10');

                selectedDateObj = tempDate;
                updateTimeSlots();
                updateFinalDateTime();
            });

            dateTabsContainer.appendChild(button);

            if (isSelected) {
                // Clone the date to avoid closure reference issues
                selectedDateObj = new Date(tempDate.getTime());
            }
        }
    };

    // Define target time slots (Morning, Afternoon, Evening shifts: 09:00 to 20:00)
    const shifts = {
        morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
        afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
        evening: ["18:00", "18:30", "19:00", "19:30"]
    };

    // 2c. Update & generate Time Slots (filter out past time slots if date is today in Hayward, CA)
    const updateTimeSlots = () => {
        if (!selectedDateObj) return;

        // If shop is closed on the selected day (only open Tue & Wed)
        if (!isOpenDay(selectedDateObj)) {
            selectedTimeStr = "";
            if (morningSlotsContainer) {
                morningSlotsContainer.innerHTML = `
                            <div class="col-span-full py-4 px-4 text-center rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900">
                                <p class="font-bold text-sm lang-el" data-vi="Tiệm đóng cửa vào ngày này" data-en="Shop is closed on this day">
                                    ${currentLang === 'en' ? 'Shop is closed on this day' : 'Tiệm đóng cửa vào ngày này'}
                                </p>
                                <p class="text-xs mt-1 text-amber-700 lang-el" data-vi="Tiệm chỉ mở cửa vào Thứ 3 &amp; Thứ 4 hàng tuần." data-en="Open on Tuesday &amp; Wednesday only.">
                                    ${currentLang === 'en' ? 'Open on Tuesday &amp; Wednesday only.' : 'Tiệm chỉ mở cửa vào Thứ 3 &amp; Thứ 4 hàng tuần.'}
                                </p>
                            </div>
                        `;
            }
            if (afternoonSlotsContainer) afternoonSlotsContainer.innerHTML = '';
            if (eveningSlotsContainer) eveningSlotsContainer.innerHTML = '';
            return;
        }

        const now = getShopNow();
        const isToday = selectedDateObj.toDateString() === now.toDateString();
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();

        const renderShiftSlots = (slotList, container) => {
            if (!container) return;
            container.innerHTML = '';

            let availableCount = 0;

            slotList.forEach(time => {
                const [h, m] = time.split(':').map(Number);
                const isPast = isToday && (h < currentHour || (h === currentHour && m <= currentMin));

                if (isPast) return; // Skip past slots for today

                availableCount++;

                const button = document.createElement('button');
                button.type = "button";
                button.setAttribute('data-time', time);

                const isActive = selectedTimeStr === time;
                button.className = `time-slot-btn py-2 px-3 text-sm font-bold rounded-xl border text-center transition-all ${isActive
                        ? 'border-blue-600 bg-blue-50/50 text-blue-600 ring-4 ring-blue-600/10'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/50 hover:border-slate-300'
                    }`;
                button.innerText = time;

                button.addEventListener('click', () => {
                    document.querySelectorAll('.time-slot-btn').forEach(b => {
                        b.classList.remove('border-blue-600', 'bg-blue-50/50', 'text-blue-600', 'ring-4', 'ring-blue-600/10');
                        b.classList.add('border-slate-200', 'bg-slate-50', 'text-slate-800');
                    });
                    button.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-800');
                    button.classList.add('border-blue-600', 'bg-blue-50/50', 'text-blue-600', 'ring-4', 'ring-blue-600/10');

                    selectedTimeStr = time;
                    updateFinalDateTime();
                });

                container.appendChild(button);
            });

            // If no slots available (e.g. today after 19:30)
            if (availableCount === 0) {
                const emptyMsg = document.createElement('p');
                emptyMsg.className = "text-xs italic text-slate-400 py-1 lang-el col-span-4";
                emptyMsg.setAttribute('data-vi', 'Đã hết giờ nhận khách');
                emptyMsg.setAttribute('data-en', 'No slots left');
                emptyMsg.innerText = currentLang === 'en' ? 'No slots left' : 'Đã hết giờ nhận khách';
                container.appendChild(emptyMsg);
            }
        };

        renderShiftSlots(shifts.morning, morningSlotsContainer);
        renderShiftSlots(shifts.afternoon, afternoonSlotsContainer);
        renderShiftSlots(shifts.evening, eveningSlotsContainer);
    };

    // 2d. Combine selected Date + Time and update hidden input and visual text
    updateFinalDateTime = () => {
        if (!selectedDateObj || !selectedTimeStr) {
            if (datetimeInput) datetimeInput.value = "";
            if (selectedTimeDisplay) selectedTimeDisplay.classList.add('hidden');
            return;
        }

        const d = pad(selectedDateObj.getDate());
        const m = pad(selectedDateObj.getMonth() + 1);
        const y = selectedDateObj.getFullYear();

        // Parse select time hour and minutes
        const [h, min] = selectedTimeStr.split(':').map(Number);

        // Compute end time (+30 minutes)
        let eh = h;
        let mintemp = min + 30;
        if (mintemp >= 60) {
            mintemp = mintemp - 60;
            eh = (h + 1) % 24;
        }

        const startStr = `${pad(h)}:${pad(min)}`;
        const endStr = `${pad(eh)}:${pad(mintemp)}`;

        // Format: m/d/Y H:i - eh:emin (same as flatpickr output format)
        const finalVal = `${m}/${d}/${y} ${startStr} - ${endStr} (PT)`;
        if (datetimeInput) {
            datetimeInput.value = finalVal;
        }

        // Show visual selection summary card
        if (selectedTimeDisplay && selectedTimeText) {
            selectedTimeDisplay.classList.remove('hidden');

            const weekdaysFullVI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
            const weekdaysFullEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = selectedDateObj.getDay();

            const viText = `${weekdaysFullVI[dayOfWeek]}, ngày ${d}/${m}/${y} | Khung giờ: ${startStr} - ${endStr} (Giờ California - PT)`;
            const enText = `${weekdaysFullEN[dayOfWeek]}, ${m}/${d}/${y} | Slot: ${startStr} - ${endStr} (California Time - PT)`;

            selectedTimeText.setAttribute('data-vi', viText);
            selectedTimeText.setAttribute('data-en', enText);
            selectedTimeText.innerText = currentLang === 'en' ? enText : viText;
        }
    };

    // Initialize visual elements on load
    generateDateTabs();
    updateTimeSlots();


    // --- 3. XỬ LÝ SUBMIT FORM ĐẶT LỊCH (GỬI QUA WEB3FORMS) ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const service = serviceSelect.value;
            const time = datetimeInput.value;
            const submitBtn = this.querySelector('button[type="submit"]');

            // Validation 1: Service Card selection
            if (!service || service === "" || service === "Not selected") {
                const serviceWrapper = document.getElementById('service-selector-wrapper');
                if (serviceWrapper) {
                    serviceWrapper.classList.add('border-red-500', 'ring-4', 'ring-red-500/10');
                    serviceWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        serviceWrapper.classList.remove('border-red-500', 'ring-4', 'ring-red-500/10');
                    }, 3000);
                }
                return;
            }

            // Validation 2: Time Selection
            if (!time) {
                const timeWrapper = document.getElementById('datetime-picker-wrapper');
                if (timeWrapper) {
                    timeWrapper.classList.add('border-red-500', 'ring-4', 'ring-red-500/10');
                    timeWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        timeWrapper.classList.remove('border-red-500', 'ring-4', 'ring-red-500/10');
                    }, 3000);
                }
                return;
            }

            const formData = new FormData(bookingForm);
            const formObj = Object.fromEntries(formData);

            submitBtn.innerText = currentLang === 'en' ? "SENDING INFO..." : "ĐANG GỬI THÔNG TIN...";
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formObj)
            })
                .then(async (response) => {
                    let json = await response.json();
                    const name = document.getElementById('cus_name').value;
                    const phone = document.getElementById('cus_phone').value;
                    const serviceVal = document.getElementById('cus_service').value;
                    const branchVal = document.getElementById('cus_branch').value;
                    const formattedTime = time.replace('T', ' ');

                    showSuccessTicket({
                        name: name,
                        phone: phone,
                        service: serviceVal,
                        time: formattedTime,
                        branch: branchVal
                    });

                    bookingForm.reset();

                    // Reset custom selection states
                    serviceCards.forEach(c => {
                        c.classList.remove('border-blue-600', 'bg-blue-50/50', 'ring-4', 'ring-blue-600/10');
                        c.classList.add('border-slate-200', 'bg-slate-50');
                    });
                    selectedTimeStr = "";
                    generateDateTabs();
                    updateTimeSlots();
                    updateFinalDateTime();
                })
                .catch((error) => {
                    console.error('Network error:', error);
                    const name = document.getElementById('cus_name').value;
                    const phone = document.getElementById('cus_phone').value;
                    const serviceVal = document.getElementById('cus_service').value;
                    const branchVal = document.getElementById('cus_branch').value;
                    const formattedTime = time.replace('T', ' ');

                    showSuccessTicket({
                        name: name,
                        phone: phone,
                        service: serviceVal,
                        time: formattedTime,
                        branch: branchVal
                    });
                })
                .finally(() => {
                    submitBtn.innerText = currentLang === 'en' ? "CONFIRM BOOKING" : "XÁC NHẬN ĐẶT LỊCH";
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                });
        });
    }

    // --- GOOGLE SHEETS REVIEWS ---
    let allReviews = [];

    const renderReviews = (reviews) => {
        const container = document.getElementById('review-container');
        if (!container) return;

        container.innerHTML = '';

        // Limit to max 15 reviews
        const reviewsToRender = reviews.slice(0, 15);

        if (reviewsToRender.length === 0) {
            const noReviewText = currentLang === 'en' ? 'No reviews yet.' : 'Chưa có đánh giá nào.';
            container.innerHTML = `<p class="text-slate-500 italic text-center w-full lang-el" data-vi="Chưa có đánh giá nào." data-en="No reviews yet.">${noReviewText}</p>`;
            return;
        }

        reviewsToRender.forEach(row => {
            const name = row.c[1]?.v || 'Anonymous';
            const ratingStr = row.c[4]?.v ?? '5';
            const rating = parseInt(ratingStr.toString().charAt(0)) || 5;
            const comment = row.c[5]?.v || '';

            const starsHTML = '<span class="text-yellow-400 text-2xl">' + '★'.repeat(rating) + '</span><span class="text-slate-200 text-2xl">' + '★'.repeat(5 - rating) + '</span>';

            const html = `
                        <div class="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-100 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw] snap-center">
                            <div>
                                <div class="flex gap-1 tracking-widest">${starsHTML}</div>
                                <p class="mt-4 leading-7 text-slate-600 italic line-clamp-4">"${comment}"</p>
                            </div>
                            <div class="mt-6 flex items-center gap-3 pt-4 border-t border-slate-50">
                                <div class="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold uppercase">
                                    ${name.charAt(0)}
                                </div>
                                <p class="font-bold text-slate-900">${name}</p>
                            </div>
                        </div>
                    `;
            container.insertAdjacentHTML('beforeend', html);
        });
    };

    const fetchReviews = async () => {
        const SHEET_ID = '1F6YAkHVe4AQq3_6ElJivWSOWcd3vAZlmuQ9vDz6vFwc';
        const gvizUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

        const container = document.getElementById('review-container');
        if (!container) return;

        try {
            const response = await fetch(gvizUrl);
            const textData = await response.text();

            const jsonString = textData.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];
            const data = JSON.parse(jsonString);
            let rows = data.table.rows;

            allReviews = rows.filter(row => row.c && row.c[1] && row.c[4] && row.c[5]).reverse();

            renderReviews(allReviews);
        } catch (error) {
            console.error('Lỗi khi tải đánh giá:', error);
            const errorText = currentLang === 'en' ? 'Unable to load reviews at this time.' : 'Không thể tải đánh giá lúc này.';
            container.innerHTML = `<p class="text-red-500 text-base col-span-3 text-center lang-el" data-vi="Không thể tải đánh giá lúc này." data-en="Unable to load reviews at this time.">${errorText}</p>`;
        }
    }

    const setupReviewFilters = () => {
        const btnLatest = document.getElementById('filter-latest');
        const btnBest = document.getElementById('filter-best');
        const btnWorst = document.getElementById('filter-worst');

        if (!btnLatest || !btnBest || !btnWorst) return;

        const buttons = [btnLatest, btnBest, btnWorst];

        const setActiveBtn = (activeBtn) => {
            buttons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-slate-700');
            });
            activeBtn.classList.remove('bg-white', 'text-slate-700');
            activeBtn.classList.add('bg-blue-600', 'text-white');
        };

        btnLatest.addEventListener('click', () => {
            setActiveBtn(btnLatest);
            renderReviews(allReviews); // allReviews is already newest first (reversed)
        });

        btnBest.addEventListener('click', () => {
            setActiveBtn(btnBest);
            const bestReviews = [...allReviews].sort((a, b) => {
                const ratingA = parseInt(a.c[4].v.toString().charAt(0)) || 5;
                const ratingB = parseInt(b.c[4].v.toString().charAt(0)) || 5;
                return ratingB - ratingA;
            });
            renderReviews(bestReviews);
        });

        btnWorst.addEventListener('click', () => {
            setActiveBtn(btnWorst);
            const worstReviews = [...allReviews].sort((a, b) => {
                const ratingA = parseInt(a.c[4].v.toString().charAt(0)) || 5;
                const ratingB = parseInt(b.c[4].v.toString().charAt(0)) || 5;
                return ratingA - ratingB;
            });
            renderReviews(worstReviews);
        });
    };

    fetchReviews().then(() => {
        setupReviewFilters();
    });

    // --- AUTO SCROLL CAROUSELS ---
    const setupAutoScroll = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        let isPaused = false;
        let intervalId;
        let isDown = false;
        let startX;
        let scrollLeft;

        const startScroll = () => {
            intervalId = setInterval(() => {
                if (isPaused || isDown) return;
                if (container.scrollWidth <= container.clientWidth) return;

                const maxScroll = container.scrollWidth - container.clientWidth;
                if (container.scrollLeft >= maxScroll - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    if (container.children.length > 0) {
                        const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
                        const cardWidth = container.children[0].offsetWidth + gap;
                        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }
            }, 3500);
        };

        startScroll();

        const pause = () => { isPaused = true; };
        const resume = () => { isPaused = false; };

        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', resume);
        container.addEventListener('touchstart', pause, { passive: true });
        container.addEventListener('touchend', resume, { passive: true });

        // Mouse Drag to Scroll
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('cursor-grabbing');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            pause();
        });
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('cursor-grabbing');
            resume();
        });
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('cursor-grabbing');
            resume();
        });
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            container.scrollLeft = scrollLeft - walk;
        });
    };

    setTimeout(() => {
        setupAutoScroll('home-banner-track');
        setupAutoScroll('interior-track');
        setupAutoScroll('gallery-track');
        setupAutoScroll('review-container');
    }, 2000);

    // --- 5. SCROLL REVEAL ANIMATION ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // only animate once
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));

    // --- 6. ACTIVE NAV LINK (highlight khi cuộn đến section) ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('nav-active');
                    }
                });

                // Ẩn thanh "Book Now" dính khi khách đã ở section đặt lịch
                const stickyBar = document.getElementById('sticky-book-bar');
                if (stickyBar) {
                    if (entry.target.id === 'booking') {
                        stickyBar.style.transform = 'translateY(100%)';
                    } else {
                        stickyBar.style.transform = 'translateY(0)';
                    }
                }
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // --- 7. BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 8. 3D TILT EFFECT (nghiêng theo con trỏ chuột) ---
    // Chỉ chạy trên thiết bị có chuột thật (desktop), bỏ qua mobile/tablet cảm ứng
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const MAX_TILT = 8; // độ nghiêng tối đa (deg)
        const tiltTargets = document.querySelectorAll('.gallery-card, .service-card');

        tiltTargets.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // vị trí chuột trong card
                const y = e.clientY - rect.top;

                const percentX = (x / rect.width) - 0.5;  // -0.5 -> 0.5
                const percentY = (y / rect.height) - 0.5; // -0.5 -> 0.5

                const rotateY = percentX * MAX_TILT * 2;   // trái/phải
                const rotateX = percentY * -MAX_TILT * 2;  // trên/dưới

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform =
                    'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // --- 9. LUXURY PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const dismissPreloader = () => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 700);
        };
        // Dismiss quickly so user experience stays fast & fluid
        setTimeout(dismissPreloader, 450);
    }

    // --- 10. LIVE BOOKING SOCIAL PROOF TOAST ---
    const initLiveBookingToast = () => {
        const toast = document.getElementById('live-booking-toast');
        const toastMsg = document.getElementById('toast-message');
        const toastTime = document.getElementById('toast-time');
        const toastAvatar = document.getElementById('toast-avatar');
        const toastClose = document.getElementById('toast-close');
        if (!toast || !toastMsg) return;

        let defaultBookings = [
            { name: "Anh Tuấn", service: "Combo Cắt Gội VIP", serviceEn: "VIP Cut & Wash Combo", timeVi: "2 phút trước", timeEn: "2 mins ago", avatar: "T", bg: "bg-blue-600" },
            { name: "David M.", service: "Uốn Tóc Nam (Perm)", serviceEn: "Men's Perm", timeVi: "5 phút trước", timeEn: "5 mins ago", avatar: "D", bg: "bg-emerald-600" },
            { name: "Anh Minh", service: "Modern Undercut", serviceEn: "Modern Undercut", timeVi: "9 phút trước", timeEn: "9 mins ago", avatar: "M", bg: "bg-indigo-600" },
            { name: "Alex K.", service: "Taper Fade Sắc Nét", serviceEn: "Sharp Taper Fade", timeVi: "14 phút trước", timeEn: "14 mins ago", avatar: "A", bg: "bg-amber-600" },
            { name: "Hoàng Nam", service: "Nhuộm Tóc Thời Trang", serviceEn: "Fashion Hair Dye", timeVi: "19 phút trước", timeEn: "19 mins ago", avatar: "H", bg: "bg-purple-600" },
            { name: "Eric P.", service: "Cắt + Gội + Tạo Kiểu", serviceEn: "Cut + Wash + Style", timeVi: "27 phút trước", timeEn: "27 mins ago", avatar: "E", bg: "bg-cyan-600" }
        ];

        try {
            const saved = JSON.parse(localStorage.getItem('barber_recent_bookings') || '[]');
            if (Array.isArray(saved) && saved.length > 0) {
                defaultBookings = [...saved, ...defaultBookings];
            }
        } catch (e) {}

        let sampleBookings = defaultBookings;
        let currentIndex = 0;
        let isDismissed = false;
        let hideTimeout = null;

        const displayToastItem = (item) => {
            if (isDismissed || !item) return;
            const isEn = currentLang === 'en';
            if (toastAvatar) {
                toastAvatar.textContent = item.avatar || (item.name ? item.name.charAt(0) : 'T');
                toastAvatar.className = `flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold ${item.bg || 'bg-blue-600'} shadow-md ring-2 ring-blue-400/50`;
            }

            toastMsg.innerHTML = isEn
                ? `<strong>${item.name}</strong> just booked <span class="text-blue-600 font-bold">${item.serviceEn || item.service}</span>`
                : `<strong>${item.name}</strong> vừa đặt lịch <span class="text-blue-600 font-bold">${item.service}</span>`;
            if (toastTime) {
                toastTime.textContent = isEn ? (item.timeEn || "Just now") : (item.timeVi || "Vừa xong");
            }

            toast.classList.add('show');

            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 5500);
        };

        const showToast = () => {
            const item = sampleBookings[currentIndex];
            displayToastItem(item);
            currentIndex = (currentIndex + 1) % sampleBookings.length;
        };

        window.addNewLiveBooking = (newBooking) => {
            isDismissed = false;
            sampleBookings.unshift(newBooking);
            currentIndex = 0;
            try {
                const saved = JSON.parse(localStorage.getItem('barber_recent_bookings') || '[]');
                saved.unshift(newBooking);
                localStorage.setItem('barber_recent_bookings', JSON.stringify(saved.slice(0, 5)));
            } catch (e) {}
            setTimeout(() => {
                displayToastItem(newBooking);
            }, 1000);
        };

        setTimeout(() => {
            showToast();
            setInterval(showToast, 14000);
        }, 2500);

        if (toastClose) {
            toastClose.addEventListener('click', () => {
                toast.classList.remove('show');
                isDismissed = true;
            });
        }
    };
    initLiveBookingToast();
});