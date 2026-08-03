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

    // --- Modal Handler ---
    const modalEl = document.getElementById('success-modal');
    const modalCard = document.getElementById('success-modal-card');

    const showModal = (message) => {
        const modalMsg = document.getElementById('success-modal-message');
        modalMsg.innerText = message;
        modalEl.classList.remove('hidden');
        modalEl.classList.add('flex');
        // Trigger reflow for CSS transition
        void modalEl.offsetWidth;
        modalEl.classList.remove('opacity-0');
        modalCard.classList.remove('scale-95');
        modalCard.classList.add('scale-100');
    };

    const closeModal = () => {
        modalEl.classList.add('opacity-0');
        modalCard.classList.remove('scale-100');
        modalCard.classList.add('scale-95');
        setTimeout(() => {
            modalEl.classList.add('hidden');
            modalEl.classList.remove('flex');
        }, 300);
    };

    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    // Close modal when clicking backdrop
    modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });


    // --- 0. XỬ LÝ CHUYỂN NGÔN NGỮ (LANGUAGE TOGGLE) ---
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'en'; // MẶC ĐỊNH LÀ TIẾNG ANH

    const applyLang = (lang) => {
        // Cập nhật html lang attribute
        document.getElementById('html-root').setAttribute('lang', lang);

        // Cập nhật chữ trên nút
        langToggleBtn.innerText = lang === 'en' ? 'VN' : 'EN';

        // Cập nhật toàn bộ các thẻ có class lang-el
        document.querySelectorAll('.lang-el').forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) el.innerHTML = newText;
        });

        // ĐỔI NGÔN NGỮ GOOGLE FORM (Đổi link iframe)
        const feedbackIframe = document.getElementById('feedback-form');
        if (feedbackIframe) {
            const newUrl = feedbackIframe.getAttribute(`data-url-${lang}`);
            if (newUrl) feedbackIframe.src = newUrl;
        }
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

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });


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

    // 2b. Generate Date Tabs for the next 7 days
    const generateDateTabs = () => {
        if (!dateTabsContainer) return;
        dateTabsContainer.innerHTML = '';

        const now = new Date();

        // Find first open day (Tuesday or Wednesday) to auto-select
        let defaultSelectIdx = -1;
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date();
            checkDate.setDate(now.getDate() + i);
            if (isOpenDay(checkDate)) {
                defaultSelectIdx = i;
                break;
            }
        }
        if (defaultSelectIdx === -1) defaultSelectIdx = 0;

        for (let i = 0; i < 7; i++) {
            const tempDate = new Date();
            tempDate.setDate(now.getDate() + i);

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
                selectedDateObj = tempDate;
            }
        }
    };

    // Define target time slots (Morning, Afternoon, Evening shifts: 09:00 to 20:00)
    const shifts = {
        morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
        afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
        evening: ["18:00", "18:30", "19:00", "19:30"]
    };

    // 2c. Update & generate Time Slots (filter out past time slots if date is today)
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
                                <p class="text-xs mt-1 text-amber-700 lang-el" data-vi="Tiệm chỉ mở cửa vào Thứ 3 & Thứ 4 hàng tuần." data-en="Open on Tuesday & Wednesday only.">
                                    ${currentLang === 'en' ? 'Open on Tuesday & Wednesday only.' : 'Tiệm chỉ mở cửa vào Thứ 3 & Thứ 4 hàng tuần.'}
                                </p>
                            </div>
                        `;
            }
            if (afternoonSlotsContainer) afternoonSlotsContainer.innerHTML = '';
            if (eveningSlotsContainer) eveningSlotsContainer.innerHTML = '';
            return;
        }

        const now = new Date();
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

            // If no slots available (e.g. today after 21:30)
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
    const updateFinalDateTime = () => {
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
        if (mintemp === 60) {
            mintemp = 0;
            eh = (h + 1) % 24;
        }

        const startStr = `${pad(h)}:${pad(min)}`;
        const endStr = `${pad(eh)}:${pad(mintemp)}`;

        // Format: m/d/Y H:i - eh:emin (same as flatpickr output format)
        const finalVal = `${m}/${d}/${y} ${startStr} - ${endStr}`;
        if (datetimeInput) {
            datetimeInput.value = finalVal;
        }

        // Show visual selection summary card
        if (selectedTimeDisplay && selectedTimeText) {
            selectedTimeDisplay.classList.remove('hidden');

            const weekdaysFullVI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
            const weekdaysFullEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = selectedDateObj.getDay();

            const viText = `${weekdaysFullVI[dayOfWeek]}, ngày ${d}/${m}/${y} | Khung giờ: ${startStr} - ${endStr}`;
            const enText = `${weekdaysFullEN[dayOfWeek]}, ${m}/${d}/${y} | Slot: ${startStr} - ${endStr}`;

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

            submitBtn.innerText = currentLang === 'en' ? "SENDING INFO..." : "ĐANG GỬI THÔNG TIN...";
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        const name = document.getElementById('cus_name').value;
                        const formattedTime = time.replace('T', ' ');

                        if (currentLang === 'en') {
                            showModal(`Thank you ${name}.\n1997 Barber has recorded your appointment on: ${formattedTime}.\nWe will call you shortly to confirm.`);
                        } else {
                            showModal(`Cảm ơn bạn ${name}.\n1997 Barber đã ghi nhận lịch hẹn của bạn vào: ${formattedTime}.\nChúng tôi sẽ sớm gọi lại để xác nhận.`);
                        }
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
                    } else {
                        console.error('Web3Forms error:', json);
                        const errText = currentLang === 'en' ? 'An error occurred, please try again later!' : 'Có lỗi xảy ra, vui lòng thử lại sau!';
                        showModal(errText);
                    }
                })
                .catch((error) => {
                    console.error('Network error:', error);
                    const networkErrText = currentLang === 'en' ? 'Network error! Please check your connection and try again.' : 'Lỗi kết nối mạng! Vui lòng kiểm tra kết nối và thử lại.';
                    showModal(networkErrText);
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
            const name = row.c[1].v;
            const ratingStr = row.c[4].v;
            const rating = parseInt(ratingStr.toString().charAt(0)) || 5;
            const comment = row.c[5].v;

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
});