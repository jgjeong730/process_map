export default function StageCard({ stage, isActive, progress, onClick, isLast }) {
  const total = stage.checklist.length
  const done = progress
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const isComplete = pct === 100

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 12px',
          borderRadius: '14px',
          border: `2px solid ${isActive ? stage.color : isComplete ? stage.borderColor : '#E2E8F0'}`,
          background: isActive ? stage.lightColor : isComplete ? stage.lightColor + '80' : '#FFFFFF',
          cursor: 'pointer',
          width: '120px',
          transition: 'all 0.2s ease',
          boxShadow: isActive
            ? `0 4px 14px ${stage.color}30`
            : '0 1px 3px rgba(0,0,0,0.06)',
          transform: isActive ? 'translateY(-2px)' : 'none',
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: isComplete ? stage.color : isActive ? stage.color + '20' : '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            position: 'relative',
          }}
        >
          {isComplete ? (
            <span style={{ color: '#fff', fontSize: '22px' }}>✓</span>
          ) : (
            stage.icon
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: isActive ? stage.color : '#334155',
              marginBottom: '4px',
            }}
          >
            {stage.name}
          </div>

          <div
            style={{
              fontSize: '11px',
              color: isComplete ? stage.color : '#94A3B8',
              fontWeight: '600',
            }}
          >
            {done}/{total}
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: '4px',
            background: '#E2E8F0',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: stage.color,
              borderRadius: '2px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </button>

      {!isLast && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            color: '#CBD5E1',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          →
        </div>
      )}
    </div>
  )
}
