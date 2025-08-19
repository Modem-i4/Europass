import { registerBlockType } from '@wordpress/blocks'
import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import { TextControl, ToggleControl, PanelBody } from '@wordpress/components'
import './style.scss'
import metadata from './block.json'

registerBlockType(metadata.name, {
  edit: ({ attributes, setAttributes }) => {
    const { label, mobileOnly } = attributes
    const blockProps = useBlockProps({
      className: 'va-show-more',
      'data-label': label,
      'data-mobile-only': mobileOnly ? '1' : '0'
    })

    return (
      <div {...blockProps}>
        <div>
          <InnerBlocks />
        </div>
        <div className="va-show-more__fade" />
        <button className="va-show-more__btn" type="button">{label || 'Переглянути всі'}</button>
        <div className='text-center'>(кнопка для користувача{ mobileOnly ? ', тільки для телефонів' : '' })</div>

        <InspectorControls>
          <PanelBody title="Налаштування блоку" initialOpen={true}>
            <TextControl
              label="Текст кнопки"
              value={label}
              onChange={(val) => setAttributes({ label: val })}
            />
            <ToggleControl
              label="Лише для мобільних пристроїв"
              checked={!!mobileOnly}
              onChange={(val) => setAttributes({ mobileOnly: !!val })}
            />
          </PanelBody>
        </InspectorControls>
      </div>
    )
  },

  save: ({ attributes }) => {
    const { label, mobileOnly } = attributes

    return (
      <div {...useBlockProps.save({
        className: 'va-show-more',
        'data-label': label,
        'data-mobile-only': mobileOnly ? '1' : '0'
      })}>
        <div className="va-show-more__content">
          <InnerBlocks.Content />
        </div>
        <div className="va-show-more__fade" />
        <button className="va-show-more__btn" type="button">{label || 'Переглянути всі'}</button>
      </div>
    )
  }
})
