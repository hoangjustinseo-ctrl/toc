import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "intro", hidden: true,
    title: "Mở đầu",
    content: [
      "Trong kinh doanh trên Amazon, phần lớn người bán thường bắt đầu bằng câu hỏi: bán sản phẩm nào, biên lợi nhuận bao nhiêu, chạy quảng cáo thế nào cho hiệu quả. Tuy nhiên, khi quy mô tăng lên, vấn đề không còn chỉ là \"bán có lãi hay không\", mà là \"vốn đang nằm ở đâu, quay vòng nhanh hay chậm và mô hình có đủ an toàn để mở rộng hay không\".",
      "Dòng tiền vì thế trở thành lớp nền tài chính quan trọng nhất. Doanh nghiệp có thể có doanh thu cao và lợi nhuận trên giấy tích cực, nhưng nếu không quản lý tốt dòng tiền, rất dễ rơi vào tình trạng thiếu vốn lưu động, không đủ nguồn lực để nhập hàng, xử lý biến động và nắm bắt cơ hội.",
      "Bài viết này tập trung giải thích cách dòng tiền vận hành trên Amazon, các nguyên tắc tài chính cơ bản để tối ưu lợi nhuận và vòng quay vốn, cũng như những lưu ý khi nhân rộng mô hình kinh doanh."
    ]
  },
  {
    id: "mechanism",
    tocLabel: "1. Cơ Chế Dòng Tiền Trên Amazon: Doanh Thu Và Tiền Thực Nhận Không Trùng Thời Điểm",
    title: "1. Cơ Chế Dòng Tiền Trên Amazon: Doanh Thu Và Tiền Thực Nhận Không Trùng Thời Điểm",
    content: [
      "Về mặt nguyên tắc, Amazon đóng vai trò trung gian thu – chi. Khách hàng thanh toán cho Amazon, Amazon thu phí và sau đó thanh toán lại phần còn lại cho người bán theo lịch. Khoảng chênh lệch thời gian giữa lúc phát sinh doanh thu và lúc tiền thực về tài khoản chính là yếu tố cốt lõi của bài toán dòng tiền.",
      "Khi bán theo mô hình FBA (Fulfillment by Amazon), hàng được lưu kho tại hệ thống của Amazon và Amazon thay mặt người bán xử lý khâu giao hàng. Trong mô hình này, các khoản doanh thu chỉ đủ điều kiện chi trả sau khi đơn hàng được giao thành công và hết thời gian chờ xử lý các tình huống phát sinh. Thông thường, dòng tiền từ mỗi đơn FBA sẽ được \"chốt\" sau khoảng vài ngày kể từ khi khách nhận hàng, dẫn đến độ trễ dạng T+7 là khá phổ biến.",
      "Với mô hình FBM (Fulfillment by Merchant), người bán tự chịu trách nhiệm xử lý đơn, giao hàng và một phần chăm sóc khách hàng. Mức độ rủi ro vận hành ở phía người bán cao hơn nên trong nhiều trường hợp, Amazon áp dụng thời gian thanh toán dài hơn, có thể ở mức T+14 đến T+30.",
      "Bên cạnh đó, Amazon thiết lập lịch thanh toán theo chu kỳ, thường là hai lần mỗi tháng. Điểm quan trọng là: số dư hiển thị trong Seller Central luôn cần được hiểu đúng là \"tiền đang nằm trong hệ sinh thái Amazon\", chứ không đồng nghĩa với \"tiền mặt đã sẵn sàng sử dụng\".",
      "Từ góc độ quản trị tài chính, điều này có nghĩa là doanh nghiệp cần phân biệt rõ ba lớp: doanh thu ghi nhận trên hệ thống, số tiền đủ điều kiện thanh toán và số tiền thực sự đã về tài khoản ngân hàng."
    ]
  },
  {
    id: "profit",
    tocLabel: "2. Lợi Nhuận Trên Mỗi Đơn Hàng: Biên Lợi Nhuận Phải Đủ Trước Khi Nghĩ Tới Dòng Tiền",
    title: "2. Lợi Nhuận Trên Mỗi Đơn Hàng: Biên Lợi Nhuận Phải Đủ Trước Khi Nghĩ Tới Dòng Tiền",
    content: [
      "Dòng tiền ổn định chỉ có ý nghĩa khi mô hình bán hàng thực sự tạo ra giá trị thặng dư. Nếu biên lợi nhuận trên mỗi đơn quá mỏng, các nỗ lực tối ưu dòng tiền chỉ giúp doanh nghiệp… thua lỗ nhanh hơn.",
      "Một trong những ngưỡng thường được nhắc đến là: biên lợi nhuận gộp trước quảng cáo nên từ 30% trở lên, còn giá vốn nên chiếm tối đa khoảng 25% giá bán.",
      "Có thể hình dung bằng một ví dụ đơn giản. Một sản phẩm được bán với giá 100 USD. Giá vốn toàn phần là 25 USD. Các loại phí của Amazon tổng cộng 40 USD. Tổng chi phí cứng là 65 USD, phần còn lại 35 USD là biên lợi nhuận gộp trước quảng cáo, tương đương 35%.",
      "Điểm mấu chốt là: tối ưu giá vốn, hiểu rõ cấu trúc phí và thiết kế biên lợi nhuận gộp hợp lý là nền tảng bắt buộc trước khi bàn tới chuyện vòng quay vốn hay tốc độ mở rộng."
    ]
  },
  {
    id: "inventory",
    tocLabel: "3. Hàng Tồn Kho Và Vòng Quay Hàng: Vốn Đang Nằm Ở Đâu?",
    title: "3. Hàng Tồn Kho Và Vòng Quay Hàng: Vốn Đang Nằm Ở Đâu?",
    content: [
      "Trong mô hình kinh doanh trên Amazon, vốn không chỉ nằm ở \"tiền Amazon đang giữ\", mà còn được phân tán trên toàn bộ chuỗi cung ứng: trong nhà máy, trên container, trong kho Amazon và trong hàng tồn chưa bán.",
      "Một cách tiếp cận phổ biến là xác định lượng tồn kho mục tiêu tương ứng với ba đến bốn tháng bán hàng.",
      "Ở giai đoạn cao điểm theo mùa, ví dụ quý 4, việc lập kế hoạch tồn kho cần gắn với dữ liệu lịch sử.",
      "Về bản chất, vòng quay hàng là một trụ cột của vòng quay tiền. Hàng vào kho, bán ra, chuyển thành doanh thu, sau đó trở thành tiền mặt và quay lại thành đơn hàng mới."
    ]
  },
  {
    id: "cash-cycle",
    tocLabel: "4. Vòng Quay Tiền: Không Chỉ Là Câu Hỏi \"Lãi Bao Nhiêu\", Mà Là \"Mất Bao Lâu Để Thu Về\"",
    title: "4. Vòng Quay Tiền: Không Chỉ Là Câu Hỏi \"Lãi Bao Nhiêu\", Mà Là \"Mất Bao Lâu Để Thu Về\"",
    content: [
      "Trong quản trị tài chính, khái niệm vòng quay tiền (cash conversion cycle) mô tả thời gian cần thiết để chuyển từ tiền mặt sang tồn kho, sang doanh thu, rồi quay trở lại thành tiền mặt.",
      "Một mô hình với biên lợi nhuận tốt nhưng vòng quay tiền kéo dài có thể gây áp lực lớn cho dòng vốn.",
      "Một khía cạnh thực tế khác là cách thiết kế chính sách lương – thưởng. Để đảm bảo an toàn dòng tiền, một số doanh nghiệp chốt thưởng sau hai chu kỳ thanh toán kể từ khi doanh thu phát sinh.",
      "Khi vòng quay tiền được nhìn nhận hệ thống, các quyết định liên quan đến nhập hàng, mở rộng danh mục sẽ mang tính chiến lược hơn."
    ]
  },
  {
    id: "reserve",
    tocLabel: "5. Dự Trữ Tiền Mặt: Lớp Đệm Cần Thiết Cho Mọi Mô Hình Amazon",
    title: "5. Dự Trữ Tiền Mặt: Lớp Đệm Cần Thiết Cho Mọi Mô Hình Amazon",
    content: [
      "Hoạt động trên Amazon luôn tồn tại rủi ro từ nhiều phía: thay đổi thuật toán hiển thị, điều chỉnh chính sách, đối thủ cạnh tranh mới.",
      "Trong giai đoạn vận hành ổn định, một ngưỡng tham chiếu thường được sử dụng là duy trì lượng tiền mặt đủ chi trả các chi phí cố định trong khoảng sáu tháng.",
      "Quỹ dự trữ này phải là tiền đã rút về, nằm trong tài khoản doanh nghiệp, tách biệt với phần tiền đang nằm trên Amazon hoặc trong hàng tồn."
    ]
  },
  {
    id: "scale",
    tocLabel: "6. Nhân Rộng Mô Hình: Ưu Tiên Nhân Bằng Lợi Nhuận Đã Thu Hồi",
    title: "6. Nhân Rộng Mô Hình: Ưu Tiên Nhân Bằng Lợi Nhuận Đã Thu Hồi",
    content: [
      "Khi một sản phẩm hoặc danh mục bắt đầu thu được kết quả tích cực, câu hỏi \"nên nhân lên như thế nào\" trở thành trọng tâm.",
      "Một ví dụ: doanh nghiệp khởi động với vốn 1 tỷ đồng. Sau 5-6 tháng, dòng tiền thuần là 2 tỷ. Nếu mở rộng bằng phần lợi nhuận, doanh nghiệp đã tách vốn gốc ra khỏi vùng rủi ro.",
      "Việc ưu tiên nhân rộng bằng lợi nhuận đã thu hồi là nguyên tắc an toàn mang tính quản trị."
    ]
  },
  {
    id: "fbm-fba",
    tocLabel: "7. So Sánh FBM Và FBA Dưới Góc Độ Dòng Tiền",
    title: "7. So Sánh FBM Và FBA Dưới Góc Độ Dòng Tiền",
    content: [
      "Từ góc nhìn dòng tiền, lựa chọn giữa FBA và FBM không chỉ là câu chuyện về vận hành mà còn là bài toán cấu trúc vốn.",
      "Trong mô hình FBA, doanh nghiệp cần bỏ vốn trước. Ưu điểm là logistics được chuẩn hóa. Nhưng vốn đáng kể sẽ nằm trong hàng tồn và hệ thống Amazon.",
      "Ngược lại, FBM cho phép kiểm soát tốt hơn tồn kho. Nếu vận hành tốt, có thể rút ngắn vòng quay tiền.",
      "Với người mới, FBA thường phù hợp hơn. Khi đã hiểu rõ dòng tiền, có thể cân nhắc FBM hoặc mô hình kết hợp."
    ]
  },
  {
    id: "conclusion",
    tocLabel: "Kết Luận",
    title: "Kết Luận",
    content: [
      "Dòng tiền trên Amazon là sự kết hợp giữa nhiều yếu tố: cách Amazon giữ và thanh toán tiền, cách doanh nghiệp thiết kế biên lợi nhuận, cách quản lý tồn kho, cách xây dựng vòng quay vốn và mức độ dự phòng tài chính.",
      "Hiểu đúng dòng tiền giúp doanh nghiệp xác định: có đang dùng vốn hiệu quả không, có đang mở rộng phù hợp với khả năng tài chính không.",
      "Lợi thế không chỉ thuộc về những người tìm được sản phẩm tốt hay làm marketing giỏi, mà còn thuộc về những đơn vị quản trị dòng tiền kỷ luật, minh bạch và chủ động."
    ]
  },
];

const TOC_ITEMS = SECTIONS.filter(s => !s.hidden);

/* ─── Bottom-sheet drawer (WorldFirst style) ─── */
function TOCDrawer({ sections, activeId, open, onClose, onSelect }) {
  const activeRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && activeRef.current && listRef.current) {
      const c = listRef.current;
      const el = activeRef.current;
      const t = el.offsetTop - c.offsetTop - c.clientHeight / 2 + el.clientHeight / 2;
      c.scrollTo({ top: Math.max(0, t), behavior: "smooth" });
    }
  }, [open, activeId]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms ease",
        }}
      />
      {/* Sheet */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 320ms cubic-bezier(.32,.72,0,1)",
        background: "#fff",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.1)",
        maxHeight: "68vh",
        display: "flex", flexDirection: "column",
      }}>
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 32, height: 4, borderRadius: 4, background: "#ddd" }} />
        </div>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "4px 20px 12px",
          borderBottom: "1px solid #f0f0f0",
        }}>
          <span style={{
            fontSize: 15, fontWeight: 500, color: "#484F56",
            fontFamily: "Poppins, -apple-system, sans-serif",
          }}>Mục lục</span>
          <button onClick={onClose} style={{
            background: "#f5f5f5", border: "none", borderRadius: 8,
            width: 30, height: 30, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, color: "#999", lineHeight: 1,
          }}>✕</button>
        </div>
        {/* Items — WorldFirst border-left style */}
        <div ref={listRef} style={{
          overflow: "auto", padding: "8px 20px 32px",
          WebkitOverflowScrolling: "touch",
        }}>
          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <div
                key={s.id}
                ref={isActive ? activeRef : null}
                onClick={() => onSelect(s.id)}
                style={{
                  padding: "9px 0 9px 14px",
                  borderLeft: `2px solid ${isActive ? "#1F2323" : "#ccc"}`,
                  cursor: "pointer",
                  transition: "border-color 180ms ease",
                }}
              >
                <span style={{
                  fontSize: 14, lineHeight: 1.45, fontWeight: 400,
                  color: isActive ? "rgba(31,35,35,1)" : "#90969A",
                  fontFamily: "Poppins, -apple-system, sans-serif",
                  transition: "color 180ms ease",
                  display: "block",
                }}>
                  {s.tocLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─── Reading Progress ─── */
function ReadingProgress({ progress }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: 3, background: "#f0f0f0",
    }}>
      <div style={{
        height: "100%", width: `${progress}%`,
        background: "#1F2323",
        transition: "width 60ms linear",
      }} />
    </div>
  );
}

/* ─── Main ─── */
export default function MobileTOC() {
  const [activeId, setActiveId] = useState(TOC_ITEMS[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef({});

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);

    let current = TOC_ITEMS[0].id;
    for (const s of SECTIONS) {
      const el = sectionRefs.current[s.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100) current = s.hidden ? TOC_ITEMS[0].id : s.id;
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id) => {
    setDrawerOpen(false);
    setTimeout(() => {
      const el = sectionRefs.current[id];
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 120);
  };

  const activeIndex = TOC_ITEMS.findIndex(s => s.id === activeId);

  /* Progress ring for the button */
  const ringR = 17;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC - (ringC * progress) / 100;

  return (
    <div style={{
      fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
      background: "#fff", minHeight: "100vh",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>

      <ReadingProgress progress={progress} />

      {/* Header */}
      <header style={{ background: "#fff", padding: "48px 20px 24px", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 12, color: "#90969A", marginBottom: 18, lineHeight: 1.5 }}>
            <span style={{ color: "#E8395A" }}>Home</span>
            <span style={{ margin: "0 5px" }}>&gt;</span>
            <span style={{ color: "#E8395A" }}>Insights</span>
            <span style={{ margin: "0 5px" }}>&gt;</span>
            <span style={{ color: "#E8395A" }}>Thương mại điện tử quốc tế</span>
          </div>
          <h1 style={{
            fontSize: 26, fontWeight: 600, lineHeight: 1.22,
            color: "#1F2323", margin: "0 0 14px",
            letterSpacing: "-0.01em",
          }}>
            Dòng Tiền Trên Amazon: Cách Hoạt Động, Cách Tối Ưu Và Cách Mở Rộng An Toàn
          </h1>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 8,
          }}>
            <span style={{ fontSize: 13, color: "#90969A" }}>
              Cập nhật lần cuối: December 9, 2025
            </span>
            <span style={{ fontSize: 12, color: "#90969A" }}>WorldFirst × Z-ECOM</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 100px" }}>
        {SECTIONS.map((s, i) => (
          <section
            key={s.id}
            ref={(el) => { sectionRefs.current[s.id] = el; }}
            style={{ marginTop: i === 0 ? 28 : 40 }}
          >
            {!s.hidden && (
              <h2 style={{
                fontSize: 18, fontWeight: 500, color: "#1F2323",
                margin: "0 0 14px", lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>
                {s.title}
              </h2>
            )}
            {s.content.map((p, j) => (
              <p key={j} style={{
                fontSize: 15, lineHeight: 1.75, color: "#484F56",
                margin: "0 0 14px",
              }}>{p}</p>
            ))}
          </section>
        ))}
        <div style={{
          marginTop: 40, padding: "14px 16px",
          background: "#fafafa", borderRadius: 8,
          borderLeft: "3px solid #E8395A",
        }}>
          <p style={{ fontSize: 13, color: "#90969A", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Bài viết được phối hợp thực hiện bởi WorldFirst và Z-ECOM.
          </p>
        </div>
      </main>

      {/* ══════ Floating square button — left side, vertically centered ══════ */}
      <button
        onClick={() => setDrawerOpen(true)}
        style={{
          position: "fixed",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 900,
          width: 44,
          height: 44,
          padding: 0,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          /* let text underneath peek through */
        }}
      >
        {/* SVG: progress ring + list icon + counter */}
        <svg width="38" height="38" viewBox="0 0 38 38">
          {/* Track ring */}
          <circle
            cx="19" cy="19" r={ringR}
            fill="none" stroke="#eee" strokeWidth="2"
          />
          {/* Progress ring */}
          <circle
            cx="19" cy="19" r={ringR}
            fill="none" stroke="#1F2323" strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={ringC}
            strokeDashoffset={ringOffset}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              transition: "stroke-dashoffset 100ms linear",
            }}
          />
          {/* List icon — center */}
          <rect x="13" y="13" width="2" height="1.6" rx=".8" fill="#1F2323"/>
          <rect x="16.5" y="13" width="8.5" height="1.6" rx=".8" fill="#bbb"/>
          <rect x="13" y="16.2" width="2" height="1.6" rx=".8" fill="#1F2323"/>
          <rect x="16.5" y="16.2" width="8.5" height="1.6" rx=".8" fill="#bbb"/>
          <rect x="13" y="19.4" width="2" height="1.6" rx=".8" fill="#1F2323"/>
          <rect x="16.5" y="19.4" width="8.5" height="1.6" rx=".8" fill="#bbb"/>
          <rect x="13" y="22.6" width="2" height="1.6" rx=".8" fill="#1F2323"/>
          <rect x="16.5" y="22.6" width="8.5" height="1.6" rx=".8" fill="#bbb"/>
          {/* Counter text */}
          <text
            x="19" y="32"
            textAnchor="middle"
            fontSize="7" fontWeight="600"
            fill="#90969A"
            fontFamily="Poppins, sans-serif"
          >
            {activeIndex + 1}/{TOC_ITEMS.length}
          </text>
        </svg>
      </button>

      {/* Drawer */}
      <TOCDrawer
        sections={TOC_ITEMS}
        activeId={activeId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelect={scrollTo}
      />
    </div>
  );
}
