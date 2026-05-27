import { useState } from 'react'

function ChecklistItem({ item, checked, stageColor, lightColor, borderColor, onToggle }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        borderRadius: '10px',
        border: `1px solid ${checked ? borderColor : open ? borderColor : '#E2E8F0'}`,
        background: checked ? lightColor : open ? lightColor + '60' : '#F8FAFC',
        overflow: 'hidden',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
    >
      {/* Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setOpen(o => !o)}
      >
        {/* Checkbox — stop propagation so click doesn't also toggle accordion */}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          onClick={e => e.stopPropagation()}
          style={{
            width: '16px',
            height: '16px',
            accentColor: stageColor,
            flexShrink: 0,
            cursor: 'pointer',
          }}
        />

        <span
          style={{
            flex: 1,
            fontSize: '13px',
            color: checked ? '#64748B' : '#374151',
            textDecoration: checked ? 'line-through' : 'none',
            fontWeight: checked ? '400' : '500',
          }}
        >
          {item.text}
        </span>

        {/* Expand chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            flexShrink: 0,
            color: open ? stageColor : '#94A3B8',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease, color 0.15s ease',
          }}
        >
          <path
            d="M2.5 5L7 9.5L11.5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Expanded detail */}
      {open && (
        <div
          style={{
            padding: '0 12px 12px 38px',
            borderTop: `1px solid ${borderColor}`,
            paddingTop: '10px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#475569',
              lineHeight: '1.6',
              marginBottom: '6px',
            }}
          >
            {item.detail}
          </p>
          <p
            style={{
              fontSize: '12px',
              color: stageColor,
              fontWeight: '600',
              lineHeight: '1.5',
              background: lightColor,
              borderRadius: '6px',
              padding: '6px 10px',
            }}
          >
            {item.example}
          </p>
        </div>
      )}
    </div>
  )
}

export default function StagePanel({ stage, checks, onToggle }) {
  if (!stage) {
    return (
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '40px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          minHeight: '300px',
          color: '#94A3B8',
        }}
      >
        <div style={{ fontSize: '40px' }}>👆</div>
        <p style={{ fontSize: '15px', fontWeight: '500' }}>위의 단계를 클릭하세요</p>
        <p style={{ fontSize: '13px' }}>단계별 체크리스트와 산출물을 확인할 수 있습니다</p>
      </div>
    )
  }

  const total = stage.checklist.length
  const done = stage.checklist.filter(item => checks[item.id]).length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: `1px solid ${stage.borderColor}`,
        boxShadow: `0 4px 14px ${stage.color}15`,
        overflow: 'hidden',
      }}
    >
      {/* Stage Header */}
      <div
        style={{
          padding: '20px 24px',
          background: stage.lightColor,
          borderBottom: `1px solid ${stage.borderColor}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: stage.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            {stage.icon}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>
              {stage.name}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B' }}>{stage.description}</p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: stage.color }}>
              {pct}%
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{done}/{total} 완료</div>
          </div>
        </div>

        <div style={{ height: '6px', background: '#fff', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: stage.color,
              borderRadius: '3px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Checklist */}
        <div style={{ flex: '1', minWidth: '260px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>
            ✅ 체크리스트
            <span style={{ fontSize: '11px', fontWeight: '400', color: '#94A3B8', marginLeft: '8px' }}>
              항목을 클릭하면 설명을 볼 수 있어요
            </span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {stage.checklist.map(item => (
              <ChecklistItem
                key={item.id}
                item={item}
                checked={!!checks[item.id]}
                stageColor={stage.color}
                lightColor={stage.lightColor}
                borderColor={stage.borderColor}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>

        {/* Templates */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>
            📄 주요 산출물
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stage.templates.map((tpl, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                  {tpl.name}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                  {tpl.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
